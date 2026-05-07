from __future__ import annotations

import base64
import html
import hashlib
import os
import secrets
import shutil
import smtplib
from datetime import datetime, timedelta
from decimal import Decimal
from email.message import EmailMessage
from pathlib import Path
from typing import Any
from urllib import parse as urllib_parse
from urllib import request as urllib_request

from flask import Flask, jsonify, make_response, redirect, render_template_string, request, send_from_directory, session, url_for
import mysql.connector
from mysql.connector import Error
from werkzeug.security import check_password_hash, generate_password_hash

from backend_config import (
    ADMIN_PASSWORD,
    ADMIN_USERNAME,
    DB_CONFIG,
    MAX_FILE_SIZE,
    ROOT_DIR,
    SECRET_KEY,
    UPLOADS_DIR,
)


app = Flask(__name__, static_folder=str(ROOT_DIR), static_url_path="")
app.config["MAX_CONTENT_LENGTH"] = MAX_FILE_SIZE
app.secret_key = SECRET_KEY
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

OTP_EXPIRY_MINUTES = max(int(os.environ.get("CITIZEN_OTP_EXPIRY_MINUTES", "5") or 5), 1)
OTP_RESEND_SECONDS = max(int(os.environ.get("CITIZEN_OTP_RESEND_SECONDS", "60") or 60), 15)
OTP_MAX_ATTEMPTS = max(int(os.environ.get("CITIZEN_OTP_MAX_ATTEMPTS", "5") or 5), 1)
OTP_STORE: dict[str, dict[str, Any]] = {}
APP_SERVER_MARKER = "esahyogi-admin-manage-v2"
COMPLAINT_STATUS_FLOW = ("Submitted", "Processing", "Resolved")
COMPLAINT_STATUS_ALIASES = {
    "submitted": "Submitted",
    "pending": "Submitted",
    "open": "Submitted",
    "complaint registered": "Submitted",
    "processing": "Processing",
    "in progress": "Processing",
    "under review": "Processing",
    "under investigation": "Processing",
    "resolved": "Resolved",
    "closed": "Resolved",
}
COMPLAINT_STATUS_PROGRESS = {
    "Submitted": 33,
    "Processing": 67,
    "Resolved": 100,
}
COMPLAINT_STATUS_DESCRIPTIONS = {
    "Submitted": "Complaint submitted successfully and assigned for review.",
    "Processing": "Complaint is currently being processed by the department.",
    "Resolved": "Complaint has been resolved by the department.",
}
COMPLAINT_DUPLICATE_LOOKBACK_HOURS = max(int(os.environ.get("COMPLAINT_DUPLICATE_LOOKBACK_HOURS", "48") or 48), 1)
COMPLAINT_SUBMIT_WINDOW_MINUTES = max(int(os.environ.get("COMPLAINT_SUBMIT_WINDOW_MINUTES", "60") or 60), 5)
COMPLAINT_SUBMIT_LIMIT_PER_WINDOW = max(int(os.environ.get("COMPLAINT_SUBMIT_LIMIT_PER_WINDOW", "5") or 5), 1)
ADMIN_ACTIVITY_LABELS = {
    "login": "Admin Login",
    "officer_login": "Officer Login",
    "status_update": "Status Update",
    "officer_status_update": "Officer Status Update",
    "complaint_delete": "Complaint Delete",
    "data_cleanup": "Data Cleanup",
}
OFFICER_DEFAULT_PASSWORD = os.environ.get("OFFICER_DEFAULT_PASSWORD", "officer123")
OFFICER_ACCOUNTS = {
    "municipal.officer": {"name": "Municipal Officer", "department": "Municipal Corporation", "password": os.environ.get("OFFICER_PASSWORD_MUNICIPAL", OFFICER_DEFAULT_PASSWORD)},
    "works.officer": {"name": "Public Works Officer", "department": "Public Works", "password": os.environ.get("OFFICER_PASSWORD_WORKS", OFFICER_DEFAULT_PASSWORD)},
    "electricity.officer": {"name": "Electricity Officer", "department": "Electricity Board", "password": os.environ.get("OFFICER_PASSWORD_ELECTRICITY", OFFICER_DEFAULT_PASSWORD)},
    "water.officer": {"name": "Water Officer", "department": "Water Department", "password": os.environ.get("OFFICER_PASSWORD_WATER", OFFICER_DEFAULT_PASSWORD)},
    "police.officer": {"name": "Police Officer", "department": "Police Department", "password": os.environ.get("OFFICER_PASSWORD_POLICE", OFFICER_DEFAULT_PASSWORD)},
    "health.officer": {"name": "Health Officer", "department": "Health Department", "password": os.environ.get("OFFICER_PASSWORD_HEALTH", OFFICER_DEFAULT_PASSWORD)},
    "education.officer": {"name": "Education Officer", "department": "Education Department", "password": os.environ.get("OFFICER_PASSWORD_EDUCATION", OFFICER_DEFAULT_PASSWORD)},
    "acb.officer": {"name": "Anti-Corruption Officer", "department": "Anti-Corruption Bureau", "password": os.environ.get("OFFICER_PASSWORD_ACB", OFFICER_DEFAULT_PASSWORD)},
}


def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)


def json_error(message: str, status_code: int = 400):
    response = jsonify({"error": message})
    response.status_code = status_code
    return response


def wants_json_response() -> bool:
    accept_header = request.headers.get("Accept", "")
    requested_with = request.headers.get("X-Requested-With", "")
    return (
        request.path.startswith("/api/")
        or "application/json" in accept_header
        or requested_with == "XMLHttpRequest"
    )


def is_allowed_cors_origin(origin: str) -> bool:
    normalized_origin = (origin or "").strip()
    if not normalized_origin:
        return False
    if normalized_origin == "null":
        return True

    parsed = urllib_parse.urlparse(normalized_origin)
    return parsed.scheme in {"http", "https"} and parsed.hostname in {"127.0.0.1", "localhost", "0.0.0.0"}


@app.after_request
def apply_cors_headers(response):
    origin = request.headers.get("Origin", "").strip()
    if is_allowed_cors_origin(origin):
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Vary"] = "Origin"
    return response


@app.errorhandler(404)
def handle_not_found(_error):
    if wants_json_response():
        return json_error("API endpoint not found. Server restart karke dobara try karein.", 404)
    return send_from_directory(ROOT_DIR, "index.html"), 404


@app.errorhandler(405)
def handle_method_not_allowed(_error):
    if wants_json_response():
        return json_error("API method allowed nahi hai. Ho sakta hai old server chal raha ho. Server restart karein.", 405)
    return json_error("Method not allowed", 405)


def normalize_digits(value: str | None) -> str:
    return "".join(ch for ch in (value or "") if ch.isdigit())


def is_valid_email(value: str) -> bool:
    if "@" not in value:
        return False
    local_part, _, domain = value.partition("@")
    return bool(local_part and domain and "." in domain)


def generate_tracking_code() -> str:
    return f"CMP-{secrets.token_hex(4).upper()}"


def ensure_uploads_dir() -> None:
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)


def allowed_upload(content_type: str) -> bool:
    return content_type.startswith("image/") or content_type.startswith("audio/") or content_type.startswith("video/")


def normalize_status(status: str | None) -> str:
    normalized = (status or "").strip()
    if not normalized:
        return "Submitted"
    return COMPLAINT_STATUS_ALIASES.get(normalized.lower(), normalized)


def get_status_progress(status: str | None) -> int:
    return COMPLAINT_STATUS_PROGRESS.get(normalize_status(status), 0)


def get_status_update_description(status: str) -> str:
    canonical_status = normalize_status(status)
    return COMPLAINT_STATUS_DESCRIPTIONS.get(
        canonical_status,
        f"Complaint status updated to {canonical_status}.",
    )


def mask_aadhaar(aadhaar: str) -> str:
    aadhaar_digits = normalize_digits(aadhaar)
    if len(aadhaar_digits) != 12:
        return ""
    return f"XXXX-XXXX-{aadhaar_digits[-4:]}"


def hash_aadhaar(aadhaar: str) -> str:
    return hashlib.sha256(normalize_digits(aadhaar).encode("utf-8")).hexdigest()


def normalize_username(username: str) -> str:
    return username.strip().lower()


def normalize_text(value: str | None) -> str:
    return " ".join(str(value or "").strip().lower().split())


def normalize_department_name(value: str | None) -> str:
    return normalize_text(value)


def to_float(value: Any) -> float | None:
    if value is None:
        return None
    if isinstance(value, Decimal):
        return float(value)
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def get_officer_account(username: str) -> dict[str, str] | None:
    return OFFICER_ACCOUNTS.get(normalize_username(username))


def is_officer_logged_in() -> bool:
    return bool(session.get("officer_logged_in") and session.get("officer_department"))


def get_officer_session() -> dict[str, str] | None:
    if not is_officer_logged_in():
        return None
    return {
        "username": str(session.get("officer_username") or ""),
        "name": str(session.get("officer_name") or ""),
        "department": str(session.get("officer_department") or ""),
    }


def officer_unauthorized():
    if wants_json_response():
        return json_error("Officer login required.", 401)
    return redirect(url_for("officer_login"))


def get_citizen_select_fields(include_password_hash: bool = False) -> str:
    fields = """
        id, full_name, gender, address_line1, sub_locality, locality,
        country, state, district, pincode, mobile, phone, email,
        username, aadhaar_masked
    """
    if include_password_hash:
        fields += ", password_hash"
    return fields


def fetch_citizen_by_mobile(connection, mobile: str, include_password_hash: bool = False) -> dict[str, Any] | None:
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute(
            f"""
            SELECT {get_citizen_select_fields(include_password_hash)}
            FROM citizen_users
            WHERE mobile = %s
            LIMIT 1
            """,
            (mobile,),
        )
        return cursor.fetchone()


def fetch_citizen_by_identifier(connection, identifier: str, include_password_hash: bool = False) -> dict[str, Any] | None:
    normalized_identifier = identifier.strip().lower()
    mobile_identifier = normalize_digits(identifier)
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute(
            f"""
            SELECT {get_citizen_select_fields(include_password_hash)}
            FROM citizen_users
            WHERE LOWER(email) = %s OR LOWER(username) = %s OR mobile = %s
            LIMIT 1
            """,
            (normalized_identifier, normalized_identifier, mobile_identifier),
        )
        return cursor.fetchone()


def otp_store_key(purpose: str, mobile: str) -> str:
    return f"{purpose}:{normalize_digits(mobile)}"


def cleanup_expired_otps() -> None:
    now = datetime.utcnow()
    expired_keys = [
        key
        for key, record in OTP_STORE.items()
        if not isinstance(record, dict) or now >= record.get("expires_at", now)
    ]
    for key in expired_keys:
        OTP_STORE.pop(key, None)


def build_otp_message(purpose: str, otp_code: str) -> str:
    if purpose == "forgot_username":
        return f"eSahyogi OTP for username recovery is {otp_code}. Valid for {OTP_EXPIRY_MINUTES} minutes."
    if purpose == "reset_password":
        return f"eSahyogi OTP for password reset is {otp_code}. Valid for {OTP_EXPIRY_MINUTES} minutes."
    return f"eSahyogi OTP for login is {otp_code}. Valid for {OTP_EXPIRY_MINUTES} minutes."


def send_sms_message(mobile: str, message: str, otp_code: str) -> dict[str, Any]:
    fast2sms_api_key = os.environ.get("FAST2SMS_API_KEY", "").strip()
    twilio_sid = os.environ.get("TWILIO_ACCOUNT_SID", "").strip()
    twilio_token = os.environ.get("TWILIO_AUTH_TOKEN", "").strip()
    twilio_from = os.environ.get("TWILIO_PHONE_NUMBER", "").strip()
    phone_number = mobile if mobile.startswith("+") else f"+91{normalize_digits(mobile)}"

    if fast2sms_api_key:
        payload = urllib_parse.urlencode(
            {
                "variables_values": otp_code,
                "route": "otp",
                "numbers": normalize_digits(mobile),
            }
        ).encode("utf-8")
        request_obj = urllib_request.Request(
            "https://www.fast2sms.com/dev/bulkV2",
            data=payload,
            method="POST",
            headers={
                "authorization": fast2sms_api_key,
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache",
            },
        )
        try:
            with urllib_request.urlopen(request_obj, timeout=15) as response:
                response.read()
            return {
                "mode": "fast2sms",
                "message": f"OTP successfully sent to {phone_number} via Fast2SMS.",
            }
        except Exception as exc:
            print(f"[OTP-FAST2SMS-ERROR] Failed to send SMS to {phone_number}: {exc}")

    if twilio_sid and twilio_token and twilio_from:
        payload = urllib_parse.urlencode(
            {
                "To": phone_number,
                "From": twilio_from,
                "Body": message,
            }
        ).encode("utf-8")
        request_obj = urllib_request.Request(
            f"https://api.twilio.com/2010-04-01/Accounts/{twilio_sid}/Messages.json",
            data=payload,
            method="POST",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        credentials = base64.b64encode(f"{twilio_sid}:{twilio_token}".encode("utf-8")).decode("ascii")
        request_obj.add_header("Authorization", f"Basic {credentials}")

        try:
            with urllib_request.urlopen(request_obj, timeout=15) as response:
                response.read()
            return {
                "mode": "sms",
                "message": f"OTP successfully sent to {phone_number}.",
            }
        except Exception as exc:
            print(f"[OTP-SMS-ERROR] Failed to send SMS to {phone_number}: {exc}")

    print(f"[OTP-DEV] Mobile {phone_number} OTP: {otp_code}")
    return {
        "mode": "dev",
        "message": f"SMS gateway configured nahi hai. Test OTP local mode me generate hua hai for {phone_number}.",
        "dev_otp": otp_code,
    }


def send_status_sms_message(mobile: str, message: str) -> dict[str, Any]:
    fast2sms_api_key = os.environ.get("FAST2SMS_API_KEY", "").strip()
    fast2sms_sender_id = (os.environ.get("FAST2SMS_SENDER_ID", "ESHYGI") or "ESHYGI").strip()[:6]
    twilio_sid = os.environ.get("TWILIO_ACCOUNT_SID", "").strip()
    twilio_token = os.environ.get("TWILIO_AUTH_TOKEN", "").strip()
    twilio_from = os.environ.get("TWILIO_PHONE_NUMBER", "").strip()
    normalized_mobile = normalize_digits(mobile)
    phone_number = mobile if str(mobile).startswith("+") else f"+91{normalized_mobile}"

    if fast2sms_api_key:
        payload_dict = {
            "route": "q",
            "message": message[:150],
            "language": "english",
            "flash": "0",
            "numbers": normalized_mobile,
            "sender_id": fast2sms_sender_id,
        }
        payload = urllib_parse.urlencode(payload_dict).encode("utf-8")
        request_obj = urllib_request.Request(
            "https://www.fast2sms.com/dev/bulkV2",
            data=payload,
            method="POST",
            headers={
                "authorization": fast2sms_api_key,
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache",
            },
        )
        try:
            with urllib_request.urlopen(request_obj, timeout=15) as response:
                response.read()
            return {
                "mode": "fast2sms",
                "message": f"Status SMS sent to {phone_number} via Fast2SMS.",
            }
        except Exception as exc:
            print(f"[STATUS-SMS-FAST2SMS-ERROR] Failed to send SMS to {phone_number}: {exc}")

    if twilio_sid and twilio_token and twilio_from:
        payload = urllib_parse.urlencode(
            {
                "To": phone_number,
                "From": twilio_from,
                "Body": message,
            }
        ).encode("utf-8")
        request_obj = urllib_request.Request(
            f"https://api.twilio.com/2010-04-01/Accounts/{twilio_sid}/Messages.json",
            data=payload,
            method="POST",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        credentials = base64.b64encode(f"{twilio_sid}:{twilio_token}".encode("utf-8")).decode("ascii")
        request_obj.add_header("Authorization", f"Basic {credentials}")
        try:
            with urllib_request.urlopen(request_obj, timeout=15) as response:
                response.read()
            return {
                "mode": "sms",
                "message": f"Status SMS sent to {phone_number}.",
            }
        except Exception as exc:
            print(f"[STATUS-SMS-TWILIO-ERROR] Failed to send SMS to {phone_number}: {exc}")

    print(f"[STATUS-SMS-DEV] Mobile {phone_number}: {message}")
    return {
        "mode": "dev",
        "message": f"Notification SMS local mode me log hua for {phone_number}.",
    }


def send_status_email_message(email: str, subject: str, message: str) -> dict[str, Any]:
    smtp_host = os.environ.get("SMTP_HOST", "").strip()
    smtp_port = int(os.environ.get("SMTP_PORT", "587") or 587)
    smtp_username = os.environ.get("SMTP_USERNAME", "").strip()
    smtp_password = os.environ.get("SMTP_PASSWORD", "").strip()
    smtp_from = os.environ.get("SMTP_FROM_EMAIL", "").strip() or smtp_username
    smtp_use_tls = (os.environ.get("SMTP_USE_TLS", "true") or "true").strip().lower() not in {"0", "false", "no"}

    if smtp_host and smtp_from:
        email_message = EmailMessage()
        email_message["Subject"] = subject
        email_message["From"] = smtp_from
        email_message["To"] = email
        email_message.set_content(message)
        try:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
                server.ehlo()
                if smtp_use_tls:
                    server.starttls()
                    server.ehlo()
                if smtp_username:
                    server.login(smtp_username, smtp_password)
                server.send_message(email_message)
            return {
                "mode": "smtp",
                "message": f"Status email sent to {email}.",
            }
        except Exception as exc:
            print(f"[STATUS-EMAIL-ERROR] Failed to send email to {email}: {exc}")

    print(f"[STATUS-EMAIL-DEV] Email {email}: {subject} | {message}")
    return {
        "mode": "dev",
        "message": f"Notification email local mode me log hua for {email}.",
    }


def build_notification_text(tracking_code: str, status: str, department: str, description: str) -> str:
    clean_description = " ".join((description or "").strip().split())
    short_description = clean_description[:90]
    if len(clean_description) > 90:
        short_description += "..."
    return (
        f"eSahyogi update: {tracking_code} is now {status}. "
        f"Dept: {department}. Note: {short_description}"
    )


def notify_complaint_contact(complaint: dict[str, Any], *, description: str) -> dict[str, str]:
    tracking_code = str(complaint.get("tracking_code") or complaint.get("code") or "").strip()
    status = normalize_status(str(complaint.get("status") or "Submitted"))
    department = str(complaint.get("department") or "").strip()
    phone = normalize_digits(str(complaint.get("phone") or ""))
    email = str(complaint.get("email") or "").strip().lower()
    message = build_notification_text(tracking_code, status, department, description)
    subject = f"eSahyogi Update: {tracking_code} - {status}"

    sms_result = {"mode": "skipped", "message": "SMS skipped."}
    email_result = {"mode": "skipped", "message": "Email skipped."}

    if len(phone) == 10:
        sms_result = send_status_sms_message(phone, message)
    if is_valid_email(email):
        email_result = send_status_email_message(email, subject, message)

    return {
        "sms_mode": str(sms_result.get("mode") or "skipped"),
        "email_mode": str(email_result.get("mode") or "skipped"),
        "summary": f"Notification status: SMS {sms_result.get('mode', 'skipped')}, Email {email_result.get('mode', 'skipped')}.",
    }


def issue_otp(purpose: str, mobile: str) -> tuple[dict[str, Any] | None, str | None, int]:
    cleanup_expired_otps()
    normalized_mobile = normalize_digits(mobile)
    now = datetime.utcnow()
    key = otp_store_key(purpose, normalized_mobile)
    existing = OTP_STORE.get(key)
    if existing:
        resend_available_at = existing.get("resend_available_at", now)
        if resend_available_at > now:
            wait_seconds = max(int((resend_available_at - now).total_seconds()), 1)
            return None, f"Please wait {wait_seconds} seconds before requesting a new OTP.", 429

    otp_code = f"{secrets.randbelow(900000) + 100000:06d}"
    OTP_STORE[key] = {
        "otp_hash": hashlib.sha256(otp_code.encode("utf-8")).hexdigest(),
        "mobile": normalized_mobile,
        "purpose": purpose,
        "attempts": 0,
        "expires_at": now + timedelta(minutes=OTP_EXPIRY_MINUTES),
        "resend_available_at": now + timedelta(seconds=OTP_RESEND_SECONDS),
    }

    delivery = send_sms_message(normalized_mobile, build_otp_message(purpose, otp_code), otp_code)
    response = {
        "message": delivery.get("message") or "OTP sent successfully.",
        "delivery_mode": delivery.get("mode", "sms"),
        "expires_in_seconds": OTP_EXPIRY_MINUTES * 60,
        "resend_in_seconds": OTP_RESEND_SECONDS,
    }
    if delivery.get("dev_otp"):
        response["dev_otp"] = delivery["dev_otp"]
    return response, None, 200


def verify_otp(purpose: str, mobile: str, otp_code: str) -> tuple[bool, str]:
    cleanup_expired_otps()
    normalized_mobile = normalize_digits(mobile)
    normalized_otp = normalize_digits(otp_code)
    if len(normalized_otp) != 6:
        return False, "Please enter a valid 6 digit OTP."

    record = OTP_STORE.get(otp_store_key(purpose, normalized_mobile))
    if not record:
        return False, "OTP request nahi mila. Pehle OTP bhejein."

    now = datetime.utcnow()
    if now >= record.get("expires_at", now):
        OTP_STORE.pop(otp_store_key(purpose, normalized_mobile), None)
        return False, "OTP expire ho gaya. Naya OTP bhejein."

    if record.get("attempts", 0) >= OTP_MAX_ATTEMPTS:
        OTP_STORE.pop(otp_store_key(purpose, normalized_mobile), None)
        return False, "OTP attempts limit cross ho gayi. Naya OTP bhejein."

    if hashlib.sha256(normalized_otp.encode("utf-8")).hexdigest() != record.get("otp_hash"):
        record["attempts"] = int(record.get("attempts", 0)) + 1
        remaining_attempts = OTP_MAX_ATTEMPTS - record["attempts"]
        if remaining_attempts <= 0:
            OTP_STORE.pop(otp_store_key(purpose, normalized_mobile), None)
            return False, "OTP attempts limit cross ho gayi. Naya OTP bhejein."
        return False, f"Invalid OTP. {remaining_attempts} attempt(s) remaining."

    OTP_STORE.pop(otp_store_key(purpose, normalized_mobile), None)
    return True, ""


def ensure_citizen_users_table(connection) -> None:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS citizen_users (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                full_name VARCHAR(150) NOT NULL,
                gender VARCHAR(20) NOT NULL,
                address_line1 VARCHAR(180) NOT NULL,
                sub_locality VARCHAR(160) DEFAULT NULL,
                locality VARCHAR(160) DEFAULT NULL,
                country VARCHAR(80) NOT NULL DEFAULT 'India',
                state VARCHAR(120) NOT NULL,
                district VARCHAR(120) NOT NULL,
                pincode VARCHAR(10) NOT NULL,
                mobile VARCHAR(20) NOT NULL,
                phone VARCHAR(20) DEFAULT NULL,
                email VARCHAR(190) NOT NULL,
                username VARCHAR(80) NOT NULL,
                aadhaar_hash CHAR(64) NOT NULL,
                aadhaar_masked VARCHAR(20) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_citizen_users_mobile (mobile),
                UNIQUE KEY uq_citizen_users_email (email),
                UNIQUE KEY uq_citizen_users_username (username),
                UNIQUE KEY uq_citizen_users_aadhaar_hash (aadhaar_hash)
            )
            """
        )
    connection.commit()


def ensure_complaints_schema(connection) -> None:
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute("SHOW TABLES LIKE 'complaints'")
        if not cursor.fetchone():
            return

        cursor.execute("SHOW COLUMNS FROM complaints LIKE 'citizen_user_id'")
        has_citizen_user_id = bool(cursor.fetchone())
        if not has_citizen_user_id:
            cursor.execute("ALTER TABLE complaints ADD COLUMN citizen_user_id INT UNSIGNED DEFAULT NULL AFTER id")

        cursor.execute("SHOW INDEX FROM complaints WHERE Key_name = 'idx_complaints_citizen_user_id'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE complaints ADD KEY idx_complaints_citizen_user_id (citizen_user_id)")

        cursor.execute("SHOW COLUMNS FROM complaints LIKE 'latitude'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE complaints ADD COLUMN latitude DECIMAL(10,7) DEFAULT NULL AFTER location_text")

        cursor.execute("SHOW COLUMNS FROM complaints LIKE 'longitude'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE complaints ADD COLUMN longitude DECIMAL(10,7) DEFAULT NULL AFTER latitude")

        cursor.execute("SHOW COLUMNS FROM complaints LIKE 'geo_accuracy'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE complaints ADD COLUMN geo_accuracy INT UNSIGNED DEFAULT NULL AFTER longitude")

        cursor.execute("SHOW TABLES LIKE 'citizen_users'")
        if cursor.fetchone():
            cursor.execute(
                """
                UPDATE complaints c
                JOIN citizen_users cu
                  ON cu.mobile = c.phone
                 AND LOWER(cu.email) = LOWER(c.email)
                SET c.citizen_user_id = cu.id
                WHERE c.citizen_user_id IS NULL
                """
            )
    connection.commit()


def fetch_managed_complaints_data(department: str | None = None) -> list[dict[str, Any]]:
    query = """
        SELECT
            c.id,
            c.tracking_code,
            c.name,
            c.email,
            c.phone,
            c.state,
            c.city,
            c.pincode,
            c.area,
            c.location_text,
            c.latitude,
            c.longitude,
            c.geo_accuracy,
            c.title,
            c.priority,
            c.category,
            c.department,
            c.status,
            c.created_at,
            COUNT(a.id) AS attachment_count
        FROM complaints c
        LEFT JOIN complaint_attachments a ON a.complaint_id = c.id
    """
    params: list[Any] = []
    if department:
        query += " WHERE c.department = %s"
        params.append(department)
    query += """
        GROUP BY
            c.id, c.tracking_code, c.name, c.email, c.phone, c.state, c.city, c.pincode,
            c.area, c.location_text, c.latitude, c.longitude, c.geo_accuracy, c.title,
            c.priority, c.category, c.department, c.status, c.created_at
        ORDER BY c.id DESC
    """

    with get_db_connection() as connection:
        ensure_complaints_schema(connection)
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(query, tuple(params))
            return cursor.fetchall()


def fetch_managed_complaint_detail(
    connection,
    complaint_id: int,
    *,
    department: str | None = None,
) -> dict[str, Any] | None:
    ensure_complaints_schema(connection)
    query = """
        SELECT
            c.id,
            c.tracking_code,
            c.name,
            c.email,
            c.phone,
            c.state,
            c.city,
            c.pincode,
            c.area,
            c.location_text,
            c.latitude,
            c.longitude,
            c.geo_accuracy,
            c.title,
            c.priority,
            c.category,
            c.department,
            c.status,
            c.created_at,
            COUNT(a.id) AS attachment_count
        FROM complaints c
        LEFT JOIN complaint_attachments a ON a.complaint_id = c.id
        WHERE c.id = %s
    """
    params: list[Any] = [complaint_id]
    if department:
        query += " AND c.department = %s"
        params.append(department)
    query += """
        GROUP BY
            c.id, c.tracking_code, c.name, c.email, c.phone, c.state, c.city, c.pincode,
            c.area, c.location_text, c.latitude, c.longitude, c.geo_accuracy, c.title,
            c.priority, c.category, c.department, c.status, c.created_at
        LIMIT 1
    """

    with connection.cursor(dictionary=True) as cursor:
        cursor.execute(query, tuple(params))
        return cursor.fetchone()


def update_managed_complaint_status(
    connection,
    complaint_id: int,
    requested_status: str,
    description: str,
    *,
    actor_type: str,
    actor_username: str,
    department: str | None = None,
) -> tuple[dict[str, Any], bool]:
    complaint = fetch_managed_complaint_detail(connection, complaint_id, department=department)
    if not complaint:
        raise LookupError("Complaint not found.")

    current_status = normalize_status(complaint["status"])
    status_changed = current_status != requested_status

    if status_changed:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE complaints
                SET status = %s
                WHERE id = %s
                LIMIT 1
                """,
                (requested_status, complaint_id),
            )
            cursor.execute(
                """
                INSERT INTO complaint_updates (complaint_id, status, description)
                VALUES (%s, %s, %s)
                """,
                (complaint_id, requested_status, description),
            )

        log_admin_activity(
            connection,
            action_type="status_update" if actor_type == "admin" else "officer_status_update",
            details=(
                f"{complaint['tracking_code']} moved from {current_status} to {requested_status}. "
                f"Note: {description}"
            ),
            admin_username=actor_username,
            complaint_id=complaint_id,
            tracking_code=str(complaint["tracking_code"]),
        )
        connection.commit()
        complaint["status"] = requested_status

    return complaint, status_changed


def ensure_admin_activity_logs_table(connection) -> None:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS admin_activity_logs (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                admin_username VARCHAR(80) NOT NULL,
                action_type VARCHAR(60) NOT NULL,
                complaint_id INT UNSIGNED DEFAULT NULL,
                tracking_code VARCHAR(20) DEFAULT NULL,
                details TEXT DEFAULT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                KEY idx_admin_activity_logs_created_at (created_at),
                KEY idx_admin_activity_logs_action_type (action_type),
                KEY idx_admin_activity_logs_tracking_code (tracking_code)
            )
            """
        )
    connection.commit()


def log_admin_activity(
    connection,
    *,
    action_type: str,
    details: str,
    admin_username: str | None = None,
    complaint_id: int | None = None,
    tracking_code: str | None = None,
) -> None:
    ensure_admin_activity_logs_table(connection)
    actor = (admin_username or session.get("admin_username") or ADMIN_USERNAME).strip() or ADMIN_USERNAME
    with connection.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO admin_activity_logs
            (admin_username, action_type, complaint_id, tracking_code, details)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (actor, action_type, complaint_id, tracking_code, details),
        )


def fetch_recent_admin_activity(limit: int = 8) -> list[dict[str, Any]]:
    safe_limit = max(1, min(int(limit or 8), 30))
    with get_db_connection() as connection:
        ensure_admin_activity_logs_table(connection)
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(
                """
                SELECT id, admin_username, action_type, complaint_id, tracking_code, details, created_at
                FROM admin_activity_logs
                ORDER BY id DESC
                LIMIT %s
                """,
                (safe_limit,),
            )
            rows = cursor.fetchall()

    activity_logs: list[dict[str, Any]] = []
    for row in rows:
        action_type = str(row["action_type"] or "").strip().lower()
        details = str(row["details"] or "").strip()
        tracking_code = str(row.get("tracking_code") or "").strip()
        activity_logs.append(
            {
                "id": int(row["id"]),
                "admin_username": row["admin_username"],
                "action_type": action_type,
                "action_label": ADMIN_ACTIVITY_LABELS.get(action_type, action_type.replace("_", " ").title()),
                "tracking_code": tracking_code,
                "message": details or "No extra details recorded.",
                "created_at": row["created_at"].strftime("%d %b %Y %I:%M %p") if isinstance(row["created_at"], datetime) else row["created_at"],
            }
        )
    return activity_logs


def get_citizen_identity_filters(citizen: dict[str, str]) -> tuple[int, str, str]:
    citizen_id = int(str(citizen.get("id", "0") or "0"))
    return citizen_id, normalize_digits(citizen.get("phone")), citizen.get("email", "").strip().lower()


def count_recent_citizen_complaints(connection, citizen: dict[str, str]) -> int:
    citizen_id, mobile, email = get_citizen_identity_filters(citizen)
    window_start = datetime.utcnow() - timedelta(minutes=COMPLAINT_SUBMIT_WINDOW_MINUTES)
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute(
            """
            SELECT COUNT(*) AS total
            FROM complaints
            WHERE (
                citizen_user_id = %s
                OR (citizen_user_id IS NULL AND phone = %s AND LOWER(email) = %s)
            )
              AND created_at >= %s
            """,
            (citizen_id, mobile, email, window_start),
        )
        result = cursor.fetchone() or {}
    return int(result.get("total") or 0)


def find_recent_duplicate_complaint(connection, citizen: dict[str, str], complaint_data: dict[str, str]) -> dict[str, Any] | None:
    citizen_id, mobile, email = get_citizen_identity_filters(citizen)
    window_start = datetime.utcnow() - timedelta(hours=COMPLAINT_DUPLICATE_LOOKBACK_HOURS)
    with connection.cursor(dictionary=True) as cursor:
        cursor.execute(
            """
            SELECT id, tracking_code, status, created_at
            FROM complaints
            WHERE (
                citizen_user_id = %s
                OR (citizen_user_id IS NULL AND phone = %s AND LOWER(email) = %s)
            )
              AND LOWER(TRIM(title)) = %s
              AND LOWER(TRIM(category)) = %s
              AND LOWER(TRIM(department)) = %s
              AND LOWER(TRIM(state)) = %s
              AND LOWER(TRIM(city)) = %s
              AND LOWER(TRIM(COALESCE(area, ''))) = %s
              AND created_at >= %s
              AND LOWER(TRIM(status)) NOT IN ('resolved', 'closed')
            ORDER BY id DESC
            LIMIT 1
            """,
            (
                citizen_id,
                mobile,
                email,
                normalize_text(complaint_data.get("title")),
                normalize_text(complaint_data.get("category")),
                normalize_text(complaint_data.get("department")),
                normalize_text(complaint_data.get("state")),
                normalize_text(complaint_data.get("city")),
                normalize_text(complaint_data.get("area")),
                window_start,
            ),
        )
        return cursor.fetchone()


def serialize_citizen_user(row: dict[str, Any]) -> dict[str, str]:
    return {
        "id": str(int(row["id"])),
        "name": row["full_name"],
        "username": row["username"],
        "phone": row["mobile"],
        "mobile": row["mobile"],
        "phone_alt": row.get("phone") or "",
        "email": row["email"],
        "aadhaar_masked": row["aadhaar_masked"],
        "gender": row["gender"],
        "address_line1": row["address_line1"],
        "sub_locality": row.get("sub_locality") or "",
        "locality": row.get("locality") or "",
        "country": row["country"],
        "state": row["state"],
        "district": row["district"],
        "pincode": row["pincode"],
    }


def set_citizen_session(citizen: dict[str, str]) -> None:
    session["citizen_user"] = citizen
    session.modified = True


def get_citizen_session() -> dict[str, str] | None:
    citizen = session.get("citizen_user")
    if not isinstance(citizen, dict):
        return None

    required_keys = ("name", "phone", "email", "aadhaar_masked", "username")
    if not all(str(citizen.get(key, "")).strip() for key in required_keys):
        return None

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    SELECT id
                    FROM citizen_users
                    WHERE LOWER(username) = %s AND mobile = %s
                    LIMIT 1
                    """,
                    (
                        normalize_username(str(citizen.get("username", ""))),
                        normalize_digits(str(citizen.get("phone", ""))),
                    ),
                )
                if cursor.fetchone():
                    return citizen
    except Error:
        return None

    session.pop("citizen_user", None)
    session.modified = True
    return None


def is_citizen_logged_in() -> bool:
    return get_citizen_session() is not None


def is_admin_logged_in() -> bool:
    return bool(session.get("admin_logged_in"))


def citizen_unauthorized():
    return json_error("Citizen login required before filing complaint", 401)


def admin_unauthorized():
    if request.path.startswith("/api/") or request.headers.get("X-Requested-With") == "XMLHttpRequest":
        return json_error("Admin login required", 401)
    if "application/json" in request.headers.get("Accept", ""):
        return json_error("Admin login required", 401)
    if "text/html" in request.headers.get("Accept", ""):
        return redirect(url_for("admin_login"))
    return json_error("Admin login required", 401)


@app.route("/")
def index():
    return send_from_directory(ROOT_DIR, "index.html")


@app.route("/api/server-meta/", methods=["GET"])
def server_meta():
    return jsonify(
        {
            "app": "eSahyogi",
            "marker": APP_SERVER_MARKER,
            "port": int(os.environ.get("PORT", "5000") or 5000),
        }
    )


@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session["admin_logged_in"] = True
            session["admin_username"] = ADMIN_USERNAME
            try:
                with get_db_connection() as connection:
                    log_admin_activity(
                        connection,
                        action_type="login",
                        details=f"{ADMIN_USERNAME} logged in to the admin portal.",
                        admin_username=ADMIN_USERNAME,
                    )
                    connection.commit()
            except Error:
                pass
            return redirect(url_for("admin_page"))
        return redirect(url_for("admin_login", error="invalid"))
    return send_from_directory(ROOT_DIR, "admin-login.html")


@app.route("/admin/logout", methods=["GET"])
def admin_logout():
    session.clear()
    return redirect(url_for("admin_login"))


@app.route("/admin")
def admin_page():
    if not is_admin_logged_in():
        return redirect(url_for("admin_login"))
    return admin_manage_page()


@app.route("/officer/login", methods=["GET", "POST"])
def officer_login():
    if is_officer_logged_in() and request.method == "GET":
        return redirect(url_for("officer_page"))

    if request.method == "POST":
        username = request.form.get("username", "").strip().lower()
        password = request.form.get("password", "")
        officer_account = get_officer_account(username)

        if officer_account and password == officer_account["password"]:
            session["officer_logged_in"] = True
            session["officer_username"] = username
            session["officer_name"] = officer_account["name"]
            session["officer_department"] = officer_account["department"]
            try:
                with get_db_connection() as connection:
                    log_admin_activity(
                        connection,
                        action_type="officer_login",
                        details=(
                            f"{username} logged in to the officer portal for "
                            f"{officer_account['department']}."
                        ),
                        admin_username=username,
                    )
                    connection.commit()
            except Error:
                pass
            return redirect(url_for("officer_page"))

        return redirect(url_for("officer_login", error="invalid"))

    error = request.args.get("error", "").strip().lower() == "invalid"
    officer_rows = sorted(
        (
            {
                "username": username,
                "name": details["name"],
                "department": details["department"],
            }
            for username, details in OFFICER_ACCOUNTS.items()
        ),
        key=lambda item: item["department"],
    )
    page_html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ brand }} Officer Login</title>
    <style>
        :root {
            --navy: #102542;
            --blue: #1f4e79;
            --saffron: #f59e0b;
            --green: #0f766e;
            --card: #ffffff;
            --border: #d8dee9;
            --text: #1f2937;
            --muted: #64748b;
            --danger: #b42318;
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            font-family: "Segoe UI", Tahoma, sans-serif;
            color: var(--text);
            background:
                radial-gradient(circle at top left, rgba(245, 158, 11, 0.18), transparent 24%),
                radial-gradient(circle at bottom right, rgba(15, 118, 110, 0.18), transparent 26%),
                linear-gradient(135deg, #eff5fb 0%, #f9fbff 52%, #edf5ff 100%);
            display: grid;
            place-items: center;
            padding: 28px;
        }
        .shell {
            width: min(1180px, 100%);
            display: grid;
            grid-template-columns: minmax(320px, 470px) minmax(340px, 1fr);
            border-radius: 32px;
            overflow: hidden;
            background: var(--card);
            border: 1px solid rgba(16, 37, 66, 0.08);
            box-shadow: 0 28px 64px rgba(15, 23, 42, 0.16);
        }
        .intro {
            position: relative;
            padding: 40px 36px;
            color: white;
            background:
                radial-gradient(circle at 18% 18%, rgba(255,255,255,0.15), transparent 24%),
                radial-gradient(circle at 86% 82%, rgba(245, 158, 11, 0.18), transparent 20%),
                linear-gradient(150deg, #0f2743 0%, #173a61 52%, #1f4e79 100%);
        }
        .intro::after {
            content: '';
            position: absolute;
            inset: 0;
            background:
                linear-gradient(120deg, rgba(255,255,255,0.08), transparent 45%),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 120px);
            pointer-events: none;
        }
        .intro > * {
            position: relative;
            z-index: 1;
        }
        .lang-switch {
            display: inline-flex;
            gap: 8px;
            margin-bottom: 18px;
            padding: 6px;
            border-radius: 999px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.14);
        }
        .lang-btn {
            border: none;
            border-radius: 999px;
            padding: 8px 14px;
            font-weight: 800;
            cursor: pointer;
            background: transparent;
            color: rgba(255,255,255,0.78);
        }
        .lang-btn.active {
            background: rgba(255,255,255,0.18);
            color: #ffffff;
        }
        .intro-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.18);
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .intro h1 {
            margin: 18px 0 10px;
            font-size: clamp(2rem, 3.8vw, 2.45rem);
            line-height: 1.1;
            font-family: Georgia, "Times New Roman", serif;
        }
        .intro p {
            margin: 0;
            color: rgba(255,255,255,0.86);
            line-height: 1.75;
            font-size: 1rem;
        }
        .intro-metrics {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            margin: 26px 0 22px;
        }
        .metric-card {
            padding: 14px 14px 12px;
            border-radius: 18px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
        }
        .metric-value {
            display: block;
            font-size: 1.35rem;
            font-weight: 900;
            margin-bottom: 4px;
        }
        .metric-label {
            color: rgba(255,255,255,0.76);
            font-size: 0.82rem;
            line-height: 1.45;
        }
        .directory-title {
            margin: 0 0 14px;
            font-size: 1rem;
            font-weight: 800;
            color: rgba(255,255,255,0.96);
        }
        .department-list {
            display: grid;
            gap: 12px;
        }
        .department-item {
            padding: 15px 16px;
            border-radius: 20px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
        }
        .department-item strong {
            display: block;
            margin-bottom: 5px;
        }
        .department-item span {
            font-size: 0.92rem;
            color: rgba(255,255,255,0.78);
        }
        .panel {
            padding: 40px 38px;
            background:
                radial-gradient(circle at top right, rgba(245, 158, 11, 0.12), transparent 18%),
                linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
        }
        .panel-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            background: #eef4ff;
            color: #174ea6;
            font-size: 0.82rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .panel h2 {
            margin: 18px 0 8px;
            color: var(--navy);
            font-size: 2rem;
        }
        .panel-copy {
            margin: 0 0 24px;
            color: var(--muted);
            line-height: 1.75;
            font-size: 1rem;
        }
        .error {
            margin-bottom: 16px;
            padding: 12px 14px;
            border-radius: 14px;
            background: #fff1f2;
            color: var(--danger);
            border: 1px solid rgba(180, 35, 24, 0.14);
            font-weight: 700;
        }
        .form-shell {
            padding: 20px;
            border-radius: 24px;
            border: 1px solid rgba(16, 37, 66, 0.08);
            background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(246,250,255,0.98));
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }
        .field {
            margin-bottom: 18px;
        }
        .field label {
            display: block;
            margin-bottom: 8px;
            font-weight: 800;
            color: var(--navy);
        }
        .field input {
            width: 100%;
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 15px 16px;
            font-size: 1rem;
            outline: none;
            background: #ffffff;
        }
        .field input:focus {
            border-color: #7aa7ff;
            box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.12);
        }
        .field-hint {
            margin-top: 7px;
            color: var(--muted);
            font-size: 0.88rem;
        }
        .quick-help {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin: 18px 0 8px;
        }
        .quick-card {
            padding: 14px 16px;
            border-radius: 18px;
            background: #f8fbff;
            border: 1px solid #dfe9f8;
        }
        .quick-card strong {
            display: block;
            margin-bottom: 4px;
            color: var(--navy);
        }
        .quick-card span {
            color: var(--muted);
            font-size: 0.88rem;
            line-height: 1.55;
        }
        .btn-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 22px;
        }
        .btn {
            border: none;
            border-radius: 999px;
            min-height: 54px;
            padding: 12px 18px;
            font-weight: 800;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 1 1 180px;
        }
        .btn-primary {
            background: linear-gradient(135deg, #f0b429, #f59e0b);
            color: #1f2937;
            box-shadow: 0 14px 26px rgba(245, 158, 11, 0.18);
        }
        .btn-secondary {
            background: #eef4ff;
            color: #174ea6;
            border: 1px solid #cfe0ff;
        }
        .note {
            margin-top: 18px;
            color: var(--muted);
            font-size: 0.92rem;
            line-height: 1.6;
        }
        @media (max-width: 920px) {
            .shell {
                grid-template-columns: 1fr;
            }
            .intro-metrics,
            .quick-help {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="shell">
        <section class="intro">
            <div class="lang-switch" aria-label="Language Switcher">
                <button class="lang-btn" type="button" data-lang-switch="en">English</button>
                <button class="lang-btn" type="button" data-lang-switch="hi">हिंदी</button>
            </div>
            <span class="intro-badge" data-i18n-key="intro_badge">Officer Desk</span>
            <h1 data-i18n-key="hero_title">{{ brand }} Officer Portal</h1>
            <p data-i18n-key="hero_copy">Manage department complaints, update status, and keep citizens informed from one focused workspace.</p>

            <div class="intro-metrics">
                <div class="metric-card">
                    <span class="metric-value">8</span>
                    <span class="metric-label" data-i18n-key="metric_departments">Department desks ready</span>
                </div>
                <div class="metric-card">
                    <span class="metric-value">24/7</span>
                    <span class="metric-label" data-i18n-key="metric_updates">Status flow access</span>
                </div>
                <div class="metric-card">
                    <span class="metric-value">Live</span>
                    <span class="metric-label" data-i18n-key="metric_notifications">Citizen alert trigger</span>
                </div>
            </div>

            <h3 class="directory-title" data-i18n-key="directory_title">Department Access Directory</h3>
            <div class="department-list">
                {% for officer in officers %}
                    <div class="department-item">
                        <strong>{{ officer.department }}</strong>
                        <span>{{ officer.name }} • {{ officer.username }}</span>
                    </div>
                {% endfor %}
            </div>
        </section>

        <section class="panel">
            <span class="panel-kicker" data-i18n-key="panel_badge">Secure Sign-In</span>
            <h2 data-i18n-key="panel_title">Officer Login</h2>
            <p class="panel-copy" data-i18n-key="panel_copy">Sign in with your officer username and password to open the department dashboard.</p>

            {% if error %}
                <div class="error" data-i18n-key="error_invalid">Invalid officer username or password.</div>
            {% endif %}

            <div class="form-shell">
                <form method="post" action="{{ url_for('officer_login') }}">
                    <div class="field">
                        <label for="officer-username" data-i18n-key="username_label">Officer Username</label>
                        <input id="officer-username" name="username" type="text" autocomplete="username" required placeholder="Enter officer username" data-i18n-placeholder="username_placeholder">
                        <div class="field-hint" data-i18n-key="username_hint">Example: electricity.officer</div>
                    </div>
                    <div class="field">
                        <label for="officer-password" data-i18n-key="password_label">Password</label>
                        <input id="officer-password" name="password" type="password" autocomplete="current-password" required placeholder="Enter password" data-i18n-placeholder="password_placeholder">
                    </div>

                    <div class="quick-help">
                        <div class="quick-card">
                            <strong data-i18n-key="quick_help_title">Quick Help</strong>
                            <span data-i18n-key="quick_help_copy">Choose the officer account that matches your department and sign in.</span>
                        </div>
                        <div class="quick-card">
                            <strong data-i18n-key="quick_demo_title">Demo Access</strong>
                            <span data-i18n-key="quick_demo_copy">Default password is shown below for local testing.</span>
                        </div>
                    </div>

                    <div class="btn-row">
                        <button class="btn btn-primary" type="submit" data-i18n-key="open_button">Open Officer Dashboard</button>
                        <a class="btn btn-secondary" href="{{ url_for('index') }}" data-i18n-key="back_button">Back To Main Site</a>
                    </div>
                </form>
            </div>

            <div class="note"><span data-i18n-key="note_prefix">Default demo password:</span> <strong>{{ officer_password_hint }}</strong></div>
        </section>
    </div>

    <script>
        const officerLoginTranslations = {
            en: {
                document_title: '{{ brand }} Officer Login',
                intro_badge: 'Officer Desk',
                hero_title: '{{ brand }} Officer Portal',
                hero_copy: 'Manage department complaints, update status, and keep citizens informed from one focused workspace.',
                metric_departments: 'Department desks ready',
                metric_updates: 'Status flow access',
                metric_notifications: 'Citizen alert trigger',
                directory_title: 'Department Access Directory',
                panel_badge: 'Secure Sign-In',
                panel_title: 'Officer Login',
                panel_copy: 'Sign in with your officer username and password to open the department dashboard.',
                error_invalid: 'Invalid officer username or password.',
                username_label: 'Officer Username',
                username_placeholder: 'Enter officer username',
                username_hint: 'Example: electricity.officer',
                password_label: 'Password',
                password_placeholder: 'Enter password',
                quick_help_title: 'Quick Help',
                quick_help_copy: 'Choose the officer account that matches your department and sign in.',
                quick_demo_title: 'Demo Access',
                quick_demo_copy: 'Default password is shown below for local testing.',
                open_button: 'Open Officer Dashboard',
                back_button: 'Back To Main Site',
                note_prefix: 'Default demo password:'
            },
            hi: {
                document_title: '{{ brand }} अधिकारी लॉगिन',
                intro_badge: 'अधिकारी डेस्क',
                hero_title: '{{ brand }} अधिकारी पोर्टल',
                hero_copy: 'अपने विभाग की शिकायतें संभालें, स्थिति अपडेट करें और नागरिकों को एक ही सुव्यवस्थित डैशबोर्ड से जानकारी दें।',
                metric_departments: 'विभागीय डेस्क तैयार',
                metric_updates: 'स्टेटस फ्लो उपलब्ध',
                metric_notifications: 'नागरिक अलर्ट ट्रिगर',
                directory_title: 'विभागीय एक्सेस सूची',
                panel_badge: 'सुरक्षित साइन-इन',
                panel_title: 'अधिकारी लॉगिन',
                panel_copy: 'विभागीय डैशबोर्ड खोलने के लिए अपना अधिकारी यूज़रनेम और पासवर्ड दर्ज करें।',
                error_invalid: 'अधिकारी यूज़रनेम या पासवर्ड सही नहीं है।',
                username_label: 'अधिकारी यूज़रनेम',
                username_placeholder: 'अधिकारी यूज़रनेम दर्ज करें',
                username_hint: 'उदाहरण: electricity.officer',
                password_label: 'पासवर्ड',
                password_placeholder: 'पासवर्ड दर्ज करें',
                quick_help_title: 'त्वरित सहायता',
                quick_help_copy: 'अपने विभाग से मेल खाने वाला अधिकारी अकाउंट चुनें और साइन इन करें।',
                quick_demo_title: 'डेमो एक्सेस',
                quick_demo_copy: 'लोकल टेस्टिंग के लिए डिफॉल्ट पासवर्ड नीचे दिया गया है।',
                open_button: 'अधिकारी डैशबोर्ड खोलें',
                back_button: 'मुख्य साइट पर जाएँ',
                note_prefix: 'डिफॉल्ट डेमो पासवर्ड:'
            }
        };

        function setOfficerLoginLanguage(lang) {
            const safeLang = lang === 'hi' ? 'hi' : 'en';
            const copy = officerLoginTranslations[safeLang];
            document.documentElement.lang = safeLang;
            document.title = copy.document_title;
            localStorage.setItem('officer_portal_lang', safeLang);

            document.querySelectorAll('[data-i18n-key]').forEach((node) => {
                const key = node.getAttribute('data-i18n-key');
                if (copy[key]) {
                    node.textContent = copy[key];
                }
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
                const key = node.getAttribute('data-i18n-placeholder');
                if (copy[key]) {
                    node.setAttribute('placeholder', copy[key]);
                }
            });

            document.querySelectorAll('[data-lang-switch]').forEach((button) => {
                button.classList.toggle('active', button.getAttribute('data-lang-switch') === safeLang);
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            const preferred = localStorage.getItem('officer_portal_lang') || localStorage.getItem('language') || 'en';
            setOfficerLoginLanguage(preferred);
            document.querySelectorAll('[data-lang-switch]').forEach((button) => {
                button.addEventListener('click', function() {
                    setOfficerLoginLanguage(button.getAttribute('data-lang-switch'));
                });
            });
        });
    </script>
</body>
</html>
"""

    response = make_response(
        render_template_string(
            page_html,
            brand="𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊",
            error=error,
            officers=officer_rows,
            officer_password_hint=OFFICER_DEFAULT_PASSWORD,
        )
    )
    response.headers["Cache-Control"] = "no-store"
    return response


@app.route("/officer/logout", methods=["GET"])
def officer_logout():
    session.pop("officer_logged_in", None)
    session.pop("officer_username", None)
    session.pop("officer_name", None)
    session.pop("officer_department", None)
    session.modified = True
    return redirect(url_for("officer_login"))


@app.route("/officer", methods=["GET"])
def officer_page():
    officer = get_officer_session()
    if not officer:
        return redirect(url_for("officer_login"))

    query = request.args.get("q", "").strip().lower()
    message = request.args.get("message", "").strip()
    message_type = request.args.get("type", "info").strip().lower()
    if message_type not in {"info", "error"}:
        message_type = "info"

    try:
        complaints_data = [
            serialize_admin_complaint_row(row)
            for row in fetch_managed_complaints_data(officer["department"])
        ]
    except Error as exc:
        complaints_data = []
        message = f"Database error: {exc}"
        message_type = "error"

    if query:
        complaints_data = [
            item
            for item in complaints_data
            if query in " ".join(
                [
                    str(item["tracking_code"]),
                    str(item["name"]),
                    str(item["phone"]),
                    str(item["title"]),
                    str(item["city"]),
                    str(item["department"]),
                    str(item["location_text"]),
                ]
            ).lower()
        ]

    total_count = len(complaints_data)
    submitted_count = sum(1 for item in complaints_data if item["status"] == "Submitted")
    processing_count = sum(1 for item in complaints_data if item["status"] == "Processing")
    resolved_count = sum(1 for item in complaints_data if item["status"] == "Resolved")

    page_html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ brand }} Officer Dashboard</title>
    <style>
        :root {
            --navy: #102542;
            --blue: #1f4e79;
            --green: #0f766e;
            --gold: #f0b429;
            --bg: #f4f7fb;
            --card: #ffffff;
            --text: #1f2937;
            --muted: #64748b;
            --border: #d8dee9;
            --info-bg: #e8f1ff;
            --info-text: #174ea6;
            --error-bg: #fff1f2;
            --error-text: #b42318;
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, sans-serif;
            color: var(--text);
            background: linear-gradient(180deg, #eef4fb 0%, #f9fbfd 100%);
        }
        .wrap {
            max-width: 1320px;
            margin: 0 auto;
            padding: 24px;
        }
        .hero {
            position: relative;
            overflow: hidden;
            background:
                radial-gradient(circle at 10% 20%, rgba(240,180,41,0.18), transparent 22%),
                radial-gradient(circle at 88% 16%, rgba(255,255,255,0.12), transparent 18%),
                linear-gradient(135deg, #123152 0%, #1a4570 48%, #1f4e79 100%);
            color: white;
            border-radius: 28px;
            padding: 28px;
            box-shadow: 0 22px 44px rgba(16, 37, 66, 0.18);
        }
        .hero::after {
            content: '';
            position: absolute;
            inset: 0;
            background:
                linear-gradient(120deg, rgba(255,255,255,0.06), transparent 42%),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 130px);
            pointer-events: none;
        }
        .hero > * {
            position: relative;
            z-index: 1;
        }
        .hero-top {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: flex-start;
            flex-wrap: wrap;
        }
        .lang-switch {
            display: inline-flex;
            gap: 8px;
            padding: 6px;
            border-radius: 999px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.16);
        }
        .lang-btn {
            border: none;
            border-radius: 999px;
            padding: 8px 14px;
            font-weight: 800;
            cursor: pointer;
            background: transparent;
            color: rgba(255,255,255,0.78);
        }
        .lang-btn.active {
            background: rgba(255,255,255,0.18);
            color: #ffffff;
        }
        .hero-badge,
        .dept-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            border: 1px solid rgba(255,255,255,0.16);
        }
        .hero-badge {
            background: rgba(255,255,255,0.12);
        }
        .dept-pill {
            margin-left: 8px;
            background: rgba(15, 118, 110, 0.18);
            color: #d8fff5;
        }
        .hero-eyebrow {
            margin: 16px 0 8px;
            color: rgba(255,255,255,0.76);
            font-size: 0.92rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 800;
        }
        .hero h1 {
            margin: 0 0 10px;
            font-size: clamp(2rem, 3.6vw, 2.5rem);
            line-height: 1.08;
            font-family: Georgia, "Times New Roman", serif;
        }
        .hero p {
            margin: 0;
            color: rgba(255,255,255,0.88);
            max-width: 780px;
            line-height: 1.75;
        }
        .hero-highlights {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-top: 24px;
        }
        .highlight-card {
            padding: 16px 16px 14px;
            border-radius: 20px;
            background: rgba(255,255,255,0.09);
            border: 1px solid rgba(255,255,255,0.12);
        }
        .highlight-card strong {
            display: block;
            font-size: 1rem;
            margin-bottom: 5px;
        }
        .highlight-card span {
            color: rgba(255,255,255,0.78);
            font-size: 0.9rem;
            line-height: 1.55;
        }
        .actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 18px;
        }
        .btn {
            border: none;
            border-radius: 999px;
            min-height: 52px;
            padding: 12px 18px;
            font-weight: 800;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .btn-primary {
            background: var(--gold);
            color: #1a1a1a;
            box-shadow: 0 14px 26px rgba(245, 158, 11, 0.18);
        }
        .btn-secondary {
            background: rgba(255,255,255,0.12);
            color: white;
            border: 1px solid rgba(255,255,255,0.22);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin: 22px 0;
        }
        .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 18px;
            padding: 20px;
            box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
        }
        .stat-card {
            position: relative;
            overflow: hidden;
        }
        .stat-card::after {
            content: '';
            position: absolute;
            inset: auto -20px -30px auto;
            width: 110px;
            height: 110px;
            border-radius: 50%;
            background: rgba(31, 78, 121, 0.06);
        }
        .stat-label {
            color: var(--muted);
            font-size: 0.92rem;
            position: relative;
            z-index: 1;
        }
        .stat-value {
            margin-top: 8px;
            font-size: 2rem;
            font-weight: 900;
            color: var(--navy);
            position: relative;
            z-index: 1;
        }
        .message {
            padding: 12px 14px;
            border-radius: 12px;
            margin-bottom: 14px;
        }
        .message.info {
            background: var(--info-bg);
            color: var(--info-text);
        }
        .message.error {
            background: var(--error-bg);
            color: var(--error-text);
        }
        .table-card {
            padding: 22px;
        }
        .table-head {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 18px;
        }
        .table-head h2 {
            margin: 0 0 6px;
            color: var(--navy);
            font-size: 1.3rem;
        }
        .table-head p {
            margin: 0;
            color: var(--muted);
            line-height: 1.7;
        }
        .toolbar {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 16px;
        }
        .search {
            flex: 1;
            min-width: 260px;
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 13px 15px;
            font-size: 1rem;
            background: #fbfdff;
        }
        .search-btn,
        .status-btn {
            border: none;
            border-radius: 999px;
            padding: 10px 16px;
            font-weight: 800;
            cursor: pointer;
        }
        .search-btn {
            background: var(--gold);
            color: #1f2937;
        }
        .table-wrap {
            overflow: auto;
            background: white;
            border-radius: 18px;
            border: 1px solid var(--border);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 1080px;
        }
        th, td {
            padding: 14px 12px;
            border-bottom: 1px solid #edf2f7;
            text-align: left;
            vertical-align: top;
        }
        th {
            background: #f8fafc;
            position: sticky;
            top: 0;
            z-index: 1;
            font-size: 0.92rem;
        }
        .badge {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 700;
        }
        .badge.submitted {
            background: #fff7e6;
            color: #b45309;
        }
        .badge.processing {
            background: #e8f1ff;
            color: #174ea6;
        }
        .badge.resolved {
            background: #ecfdf3;
            color: var(--green);
        }
        .muted {
            color: var(--muted);
            font-size: 0.9rem;
        }
        .status-actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 10px;
        }
        .status-form {
            margin: 0;
        }
        .status-btn {
            border: 1px solid var(--border);
            background: #f8fafc;
            color: var(--text);
            font-size: 0.82rem;
        }
        .status-btn.submitted {
            border-color: #f3d38b;
            color: #8a5a00;
            background: #fff8e8;
        }
        .status-btn.processing {
            border-color: #a9c5ff;
            color: #174ea6;
            background: #eef4ff;
        }
        .status-btn.resolved {
            border-color: #a7e0bf;
            color: var(--green);
            background: #effdf5;
        }
        .status-btn.active {
            box-shadow: inset 0 0 0 2px rgba(16, 37, 66, 0.12);
            cursor: default;
        }
        .pin-label,
        .gps-label {
            font-weight: 700;
            color: var(--navy);
        }
        @media (max-width: 768px) {
            .wrap {
                padding: 16px;
            }
            .hero h1 {
                font-size: 1.7rem;
            }
        }
        @media (max-width: 920px) {
            .hero-highlights {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="wrap">
        <section class="hero">
            <div class="hero-top">
                <div>
                    <span class="hero-badge" data-i18n-key="hero_badge">Officer Dashboard</span>
                    <span class="dept-pill">{{ officer.department }}</span>
                </div>
                <div class="lang-switch" aria-label="Language Switcher">
                    <button class="lang-btn" type="button" data-lang-switch="en">English</button>
                    <button class="lang-btn" type="button" data-lang-switch="hi">हिंदी</button>
                </div>
            </div>
            <div class="hero-eyebrow" data-i18n-key="hero_eyebrow">Department Officer Workspace</div>
            <h1>{{ officer.name }}</h1>
            <p data-i18n-key="hero_copy">Review complaints assigned to your department, update their current status, and keep every case moving with clear accountability.</p>
            <div class="hero-highlights">
                <div class="highlight-card">
                    <strong data-i18n-key="highlight_title_1">Focused Queue</strong>
                    <span data-i18n-key="highlight_copy_1">Only complaints mapped to your department are shown here.</span>
                </div>
                <div class="highlight-card">
                    <strong data-i18n-key="highlight_title_2">Live Updates</strong>
                    <span data-i18n-key="highlight_copy_2">Move complaints through Submitted, Processing, and Resolved instantly.</span>
                </div>
                <div class="highlight-card">
                    <strong data-i18n-key="highlight_title_3">Citizen Alerts</strong>
                    <span data-i18n-key="highlight_copy_3">Each status update can also trigger a citizen notification attempt.</span>
                </div>
            </div>
            <div class="actions">
                <a class="btn btn-primary" href="{{ url_for('officer_page') }}" data-i18n-key="refresh_button">Refresh Department Data</a>
                <a class="btn btn-secondary" href="{{ url_for('officer_logout') }}" data-i18n-key="logout_button">Logout</a>
                <a class="btn btn-secondary" href="{{ url_for('index') }}" data-i18n-key="main_site_button">Open Main Site</a>
            </div>
        </section>

        <section class="stats">
            <div class="card stat-card">
                <div class="stat-label" data-i18n-key="stat_total">Department Complaints</div>
                <div class="stat-value">{{ total_count }}</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label" data-i18n-key="stat_submitted">Submitted</div>
                <div class="stat-value">{{ submitted_count }}</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label" data-i18n-key="stat_processing">Processing</div>
                <div class="stat-value">{{ processing_count }}</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label" data-i18n-key="stat_resolved">Resolved</div>
                <div class="stat-value">{{ resolved_count }}</div>
            </div>
        </section>

        {% if message %}
            <div class="message {{ message_type }}">{{ message }}</div>
        {% endif %}

        <section class="card table-card">
            <div class="table-head">
                <div>
                    <h2 data-i18n-key="table_title">Department Complaints</h2>
                    <p data-i18n-key="table_copy">Use the filter to find a complaint quickly and update its progress from the same screen.</p>
                </div>
            </div>
            <form class="toolbar" method="get" action="{{ url_for('officer_page') }}">
                <input class="search" type="text" name="q" value="{{ query }}" placeholder="Search by tracking ID, name, phone, title, city..." data-i18n-placeholder="search_placeholder" />
                <button class="search-btn" type="submit" data-i18n-key="filter_button">Apply Filter</button>
            </form>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th data-i18n-key="head_id">ID</th>
                            <th data-i18n-key="head_tracking">Tracking ID</th>
                            <th data-i18n-key="head_name">Name</th>
                            <th data-i18n-key="head_contact">Contact</th>
                            <th data-i18n-key="head_complaint">Complaint</th>
                            <th data-i18n-key="head_location">Location</th>
                            <th data-i18n-key="head_status">Status Flow</th>
                            <th data-i18n-key="head_files">Files</th>
                            <th data-i18n-key="head_created">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% if complaints %}
                            {% for item in complaints %}
                                <tr>
                                    <td>{{ item.id }}</td>
                                    <td><strong>{{ item.tracking_code }}</strong></td>
                                    <td>
                                        <strong>{{ item.name }}</strong><br>
                                        <span class="muted">{{ item.email }}</span>
                                    </td>
                                    <td>{{ item.phone }}</td>
                                    <td>
                                        <strong>{{ item.title }}</strong><br>
                                        <span class="muted">{{ item.category }} | {{ item.priority }}</span>
                                    </td>
                                    <td>
                                        {% if item.location_text %}
                                            {{ item.location_text }}<br>
                                        {% else %}
                                            {{ item.city }}, {{ item.state }}<br>
                                        {% endif %}
                                        <span class="muted">
                                            <span class="pin-label" data-i18n-key="pin_label">PIN</span>: {{ item.pincode }}
                                            {% if item.gps_label %} • <span class="gps-label">GPS</span>: {{ item.gps_label }}{% endif %}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge {{ item.status|lower }}" data-status-badge="{{ item.status }}">{{ item.status }}</span>
                                        <div class="status-actions">
                                            {% for status in status_flow %}
                                                <form class="status-form" method="post" action="{{ url_for('officer_update_status', complaint_id=item.id) }}">
                                                    <input type="hidden" name="status" value="{{ status }}">
                                                    <input type="hidden" name="q" value="{{ query }}">
                                                    <button
                                                        class="status-btn {{ status|lower }}{% if item.status == status %} active{% endif %}"
                                                        data-status-label="{{ status }}"
                                                        type="submit"
                                                        {% if item.status == status %}disabled{% endif %}
                                                    >{{ status }}</button>
                                                </form>
                                            {% endfor %}
                                        </div>
                                    </td>
                                    <td>{{ item.attachment_count }}</td>
                                    <td>{{ item.created_at }}</td>
                                </tr>
                            {% endfor %}
                        {% else %}
                            <tr>
                                <td colspan="9" class="muted" data-i18n-key="empty_state">No complaints found for this department filter.</td>
                            </tr>
                        {% endif %}
                    </tbody>
                </table>
            </div>
        </section>
    </div>
    <script>
        const officerDashboardTranslations = {
            en: {
                document_title: '{{ brand }} Officer Dashboard',
                hero_badge: 'Officer Dashboard',
                hero_eyebrow: 'Department Officer Workspace',
                hero_copy: 'Review complaints assigned to your department, update their current status, and keep every case moving with clear accountability.',
                highlight_title_1: 'Focused Queue',
                highlight_copy_1: 'Only complaints mapped to your department are shown here.',
                highlight_title_2: 'Live Updates',
                highlight_copy_2: 'Move complaints through Submitted, Processing, and Resolved instantly.',
                highlight_title_3: 'Citizen Alerts',
                highlight_copy_3: 'Each status update can also trigger a citizen notification attempt.',
                refresh_button: 'Refresh Department Data',
                logout_button: 'Logout',
                main_site_button: 'Open Main Site',
                stat_total: 'Department Complaints',
                stat_submitted: 'Submitted',
                stat_processing: 'Processing',
                stat_resolved: 'Resolved',
                table_title: 'Department Complaints',
                table_copy: 'Use the filter to find a complaint quickly and update its progress from the same screen.',
                search_placeholder: 'Search by tracking ID, name, phone, title, city...',
                filter_button: 'Apply Filter',
                head_id: 'ID',
                head_tracking: 'Tracking ID',
                head_name: 'Name',
                head_contact: 'Contact',
                head_complaint: 'Complaint',
                head_location: 'Location',
                head_status: 'Status Flow',
                head_files: 'Files',
                head_created: 'Created',
                empty_state: 'No complaints found for this department filter.',
                pin_label: 'PIN',
                status_Submitted: 'Submitted',
                status_Processing: 'Processing',
                status_Resolved: 'Resolved'
            },
            hi: {
                document_title: '{{ brand }} अधिकारी डैशबोर्ड',
                hero_badge: 'अधिकारी डैशबोर्ड',
                hero_eyebrow: 'विभागीय अधिकारी कार्यक्षेत्र',
                hero_copy: 'अपने विभाग को सौंपी गई शिकायतों की समीक्षा करें, उनकी स्थिति अपडेट करें और हर केस को स्पष्ट जवाबदेही के साथ आगे बढ़ाएँ।',
                highlight_title_1: 'फोकस्ड सूची',
                highlight_copy_1: 'यहाँ केवल आपके विभाग से जुड़ी शिकायतें दिखाई जाती हैं।',
                highlight_title_2: 'लाइव अपडेट',
                highlight_copy_2: 'शिकायतों को तुरंत Submitted, Processing और Resolved चरणों में आगे बढ़ाएँ।',
                highlight_title_3: 'नागरिक अलर्ट',
                highlight_copy_3: 'हर स्टेटस अपडेट के साथ नागरिक सूचना ट्रिगर करने की कोशिश भी की जा सकती है।',
                refresh_button: 'विभागीय डेटा रीफ़्रेश करें',
                logout_button: 'लॉगआउट',
                main_site_button: 'मुख्य साइट खोलें',
                stat_total: 'विभागीय शिकायतें',
                stat_submitted: 'दर्ज',
                stat_processing: 'प्रोसेस में',
                stat_resolved: 'समाधान',
                table_title: 'विभागीय शिकायतें',
                table_copy: 'फ़िल्टर की मदद से शिकायत जल्दी खोजें और इसी स्क्रीन से उसकी प्रगति अपडेट करें।',
                search_placeholder: 'ट्रैकिंग आईडी, नाम, फोन, शीर्षक या शहर से खोजें...',
                filter_button: 'फ़िल्टर लागू करें',
                head_id: 'आईडी',
                head_tracking: 'ट्रैकिंग आईडी',
                head_name: 'नाम',
                head_contact: 'संपर्क',
                head_complaint: 'शिकायत',
                head_location: 'स्थान',
                head_status: 'स्टेटस फ्लो',
                head_files: 'फ़ाइलें',
                head_created: 'तारीख',
                empty_state: 'इस विभागीय फ़िल्टर के लिए कोई शिकायत नहीं मिली।',
                pin_label: 'पिन',
                status_Submitted: 'दर्ज',
                status_Processing: 'प्रोसेस में',
                status_Resolved: 'समाधान'
            }
        };

        function setOfficerDashboardLanguage(lang) {
            const safeLang = lang === 'hi' ? 'hi' : 'en';
            const copy = officerDashboardTranslations[safeLang];
            document.documentElement.lang = safeLang;
            document.title = copy.document_title;
            localStorage.setItem('officer_portal_lang', safeLang);

            document.querySelectorAll('[data-i18n-key]').forEach((node) => {
                const key = node.getAttribute('data-i18n-key');
                if (copy[key]) {
                    node.textContent = copy[key];
                }
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
                const key = node.getAttribute('data-i18n-placeholder');
                if (copy[key]) {
                    node.setAttribute('placeholder', copy[key]);
                }
            });

            document.querySelectorAll('[data-status-label]').forEach((node) => {
                const key = `status_${node.getAttribute('data-status-label')}`;
                if (copy[key]) {
                    node.textContent = copy[key];
                }
            });

            document.querySelectorAll('[data-status-badge]').forEach((node) => {
                const key = `status_${node.getAttribute('data-status-badge')}`;
                if (copy[key]) {
                    node.textContent = copy[key];
                }
            });

            document.querySelectorAll('[data-lang-switch]').forEach((button) => {
                button.classList.toggle('active', button.getAttribute('data-lang-switch') === safeLang);
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            const preferred = localStorage.getItem('officer_portal_lang') || localStorage.getItem('language') || 'en';
            setOfficerDashboardLanguage(preferred);
            document.querySelectorAll('[data-lang-switch]').forEach((button) => {
                button.addEventListener('click', function() {
                    setOfficerDashboardLanguage(button.getAttribute('data-lang-switch'));
                });
            });
        });
    </script>
</body>
</html>
"""

    response = make_response(
        render_template_string(
            page_html,
            brand="𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊",
            officer=officer,
            complaints=complaints_data,
            total_count=total_count,
            submitted_count=submitted_count,
            processing_count=processing_count,
            resolved_count=resolved_count,
            message=message,
            message_type=message_type,
            query=query,
            status_flow=COMPLAINT_STATUS_FLOW,
        )
    )
    response.headers["Cache-Control"] = "no-store"
    return response


@app.route("/api/citizen/session/", methods=["GET"])
def citizen_session():
    citizen = get_citizen_session()
    return jsonify({"logged_in": bool(citizen), "citizen": citizen})


@app.route("/api/citizen/register/", methods=["POST"])
def citizen_register():
    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    full_name = str(payload.get("full_name", "")).strip()
    gender = str(payload.get("gender", "")).strip()
    address_line1 = str(payload.get("address_line1", "")).strip()
    sub_locality = str(payload.get("sub_locality", "")).strip()
    locality = str(payload.get("locality", "")).strip()
    country = str(payload.get("country", "India") or "India").strip()
    state = str(payload.get("state", "")).strip()
    district = str(payload.get("district", "")).strip()
    pincode = normalize_digits(str(payload.get("pincode", "")))
    mobile = normalize_digits(str(payload.get("mobile", "")))
    phone = normalize_digits(str(payload.get("phone", "")))
    email = str(payload.get("email", "")).strip().lower()
    username = normalize_username(str(payload.get("username", "")))
    aadhaar = normalize_digits(str(payload.get("aadhaar", "")))
    password = str(payload.get("password", ""))

    if len(full_name) < 2:
        return json_error("Name must be at least 2 characters", 422)
    if gender not in {"Male", "Female", "Transgender"}:
        return json_error("Please select a valid gender", 422)
    if not address_line1:
        return json_error("Address is required", 422)
    if not state:
        return json_error("State is required", 422)
    if not district:
        return json_error("District is required", 422)
    if len(pincode) != 6:
        return json_error("PIN code must be 6 digits", 422)
    if len(mobile) != 10:
        return json_error("Mobile number must be 10 digits", 422)
    if phone and len(phone) < 10:
        return json_error("Phone number must be at least 10 digits", 422)
    if not is_valid_email(email):
        return json_error("Invalid email address", 422)
    if len(username) < 4 or not all(ch.isalnum() or ch in "._-" for ch in username):
        return json_error("Username must be at least 4 characters and use only letters, numbers, dot, underscore or hyphen", 422)
    if len(aadhaar) != 12:
        return json_error("Aadhaar number must be 12 digits", 422)
    if len(password) < 6:
        return json_error("Password must be at least 6 characters", 422)

    aadhaar_hash = hash_aadhaar(aadhaar)
    password_hash = generate_password_hash(password)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            with connection.cursor(dictionary=True) as cursor:
                conflict_checks = [
                    ("mobile", "Mobile number already registered", mobile),
                    ("email", "Email address already registered", email),
                    ("username", "Username already taken", username),
                    ("aadhaar_hash", "Aadhaar number already registered", aadhaar_hash),
                ]
                for field, message, value in conflict_checks:
                    cursor.execute(
                        f"SELECT id FROM citizen_users WHERE {field} = %s LIMIT 1",
                        (value,),
                    )
                    if cursor.fetchone():
                        return json_error(message, 409)

                cursor.execute(
                    """
                    INSERT INTO citizen_users
                    (full_name, gender, address_line1, sub_locality, locality, country,
                     state, district, pincode, mobile, phone, email, username,
                     aadhaar_hash, aadhaar_masked, password_hash)
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        full_name,
                        gender,
                        address_line1,
                        sub_locality,
                        locality,
                        country or "India",
                        state,
                        district,
                        pincode,
                        mobile,
                        phone,
                        email,
                        username,
                        aadhaar_hash,
                        mask_aadhaar(aadhaar),
                        password_hash,
                    ),
                )
                citizen_id = int(cursor.lastrowid)
                connection.commit()

                cursor.execute(
                    """
                    SELECT id, full_name, gender, address_line1, sub_locality, locality,
                           country, state, district, pincode, mobile, phone, email,
                           username, aadhaar_masked
                    FROM citizen_users
                    WHERE id = %s
                    LIMIT 1
                    """,
                    (citizen_id,),
                )
                citizen_row = cursor.fetchone()
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    citizen = serialize_citizen_user(citizen_row)
    set_citizen_session(citizen)
    return jsonify({"logged_in": True, "citizen": citizen, "message": "Registration successful"}), 201


@app.route("/api/citizen/login/", methods=["POST"])
def citizen_login():
    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    identifier = str(payload.get("identifier", "")).strip()
    password = str(payload.get("password", ""))

    if not identifier:
        return json_error("Mobile number, email or username is required", 422)
    if not password:
        return json_error("Password is required", 422)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            citizen_row = fetch_citizen_by_identifier(connection, identifier, include_password_hash=True)
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    if not citizen_row or not check_password_hash(citizen_row["password_hash"], password):
        return json_error("Invalid login credentials", 401)

    citizen = serialize_citizen_user(citizen_row)
    set_citizen_session(citizen)
    return jsonify({"logged_in": True, "citizen": citizen, "message": "Citizen login successful"})


@app.route("/api/citizen/login/otp/request/", methods=["POST"])
def citizen_login_otp_request():
    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    mobile = normalize_digits(str(payload.get("mobile", "")))
    if len(mobile) != 10:
        return json_error("Mobile number must be 10 digits", 422)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            citizen_row = fetch_citizen_by_mobile(connection, mobile)
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    if not citizen_row:
        return json_error("Is mobile number par koi registered account nahi mila.", 404)

    response_data, error_message, status_code = issue_otp("login", mobile)
    if error_message:
        return json_error(error_message, status_code)
    return jsonify(response_data), status_code


@app.route("/api/citizen/login/otp/", methods=["POST"])
def citizen_login_with_otp():
    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    mobile = normalize_digits(str(payload.get("mobile", "")))
    otp_code = normalize_digits(str(payload.get("otp", "")))

    if len(mobile) != 10:
        return json_error("Mobile number must be 10 digits", 422)

    is_valid, message = verify_otp("login", mobile, otp_code)
    if not is_valid:
        return json_error(message, 422)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            citizen_row = fetch_citizen_by_mobile(connection, mobile)
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    if not citizen_row:
        return json_error("Is mobile number par koi registered account nahi mila.", 404)

    citizen = serialize_citizen_user(citizen_row)
    set_citizen_session(citizen)
    return jsonify({"logged_in": True, "citizen": citizen, "message": "OTP login successful"})


@app.route("/api/citizen/forgot-username/request/", methods=["POST"])
def citizen_forgot_username_request():
    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    mobile = normalize_digits(str(payload.get("mobile", "")))
    if len(mobile) != 10:
        return json_error("Mobile number must be 10 digits", 422)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            citizen_row = fetch_citizen_by_mobile(connection, mobile)
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    if not citizen_row:
        return json_error("Is mobile number par koi registered account nahi mila.", 404)

    response_data, error_message, status_code = issue_otp("forgot_username", mobile)
    if error_message:
        return json_error(error_message, status_code)
    return jsonify(response_data), status_code


@app.route("/api/citizen/forgot-username/verify/", methods=["POST"])
def citizen_forgot_username_verify():
    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    mobile = normalize_digits(str(payload.get("mobile", "")))
    otp_code = normalize_digits(str(payload.get("otp", "")))

    if len(mobile) != 10:
        return json_error("Mobile number must be 10 digits", 422)

    is_valid, message = verify_otp("forgot_username", mobile, otp_code)
    if not is_valid:
        return json_error(message, 422)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            citizen_row = fetch_citizen_by_mobile(connection, mobile)
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    if not citizen_row:
        return json_error("Is mobile number par koi registered account nahi mila.", 404)

    return jsonify(
        {
            "message": "Username recovery successful.",
            "username": str(citizen_row["username"]),
            "mobile": mobile,
        }
    )


@app.route("/api/citizen/password-reset/request/", methods=["POST"])
def citizen_password_reset_request():
    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    mobile = normalize_digits(str(payload.get("mobile", "")))
    if len(mobile) != 10:
        return json_error("Mobile number must be 10 digits", 422)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            citizen_row = fetch_citizen_by_mobile(connection, mobile)
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    if not citizen_row:
        return json_error("Is mobile number par koi registered account nahi mila.", 404)

    response_data, error_message, status_code = issue_otp("reset_password", mobile)
    if error_message:
        return json_error(error_message, status_code)
    return jsonify(response_data), status_code


@app.route("/api/citizen/password-reset/confirm/", methods=["POST"])
def citizen_password_reset_confirm():
    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    mobile = normalize_digits(str(payload.get("mobile", "")))
    otp_code = normalize_digits(str(payload.get("otp", "")))
    new_password = str(payload.get("new_password", ""))

    if len(mobile) != 10:
        return json_error("Mobile number must be 10 digits", 422)
    if len(new_password) < 6:
        return json_error("Password must be at least 6 characters", 422)

    is_valid, message = verify_otp("reset_password", mobile, otp_code)
    if not is_valid:
        return json_error(message, 422)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE citizen_users
                    SET password_hash = %s
                    WHERE mobile = %s
                    LIMIT 1
                    """,
                    (generate_password_hash(new_password), mobile),
                )
                connection.commit()
                if cursor.rowcount == 0:
                    return json_error("Is mobile number par koi registered account nahi mila.", 404)
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    return jsonify({"message": "Password reset successful. Ab naya password use karke login karein."})


@app.route("/api/citizen/logout/", methods=["POST"])
def citizen_logout():
    session.pop("citizen_user", None)
    session.modified = True
    return jsonify({"logged_in": False, "citizen": None, "message": "Citizen logged out"})


@app.route("/api/citizen/complaints/", methods=["GET"])
def citizen_complaint_history():
    citizen = get_citizen_session()
    if not citizen:
        return citizen_unauthorized()

    try:
        limit = int(str(request.args.get("limit", "10") or "10"))
    except ValueError:
        limit = 10
    limit = max(1, min(limit, 50))

    citizen_id, mobile, email = get_citizen_identity_filters(citizen)

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            ensure_complaints_schema(connection)
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    SELECT
                        c.id,
                        c.tracking_code,
                        c.title,
                        c.priority,
                        c.category,
                        c.department,
                        c.state,
                        c.city,
                        c.pincode,
                        c.status,
                        c.created_at,
                        c.updated_at,
                        COUNT(a.id) AS attachment_count
                    FROM complaints c
                    LEFT JOIN complaint_attachments a ON a.complaint_id = c.id
                    WHERE (
                        c.citizen_user_id = %s
                        OR (c.citizen_user_id IS NULL AND c.phone = %s AND LOWER(c.email) = %s)
                    )
                    GROUP BY
                        c.id, c.tracking_code, c.title, c.priority, c.category, c.department,
                        c.state, c.city, c.pincode, c.status, c.created_at, c.updated_at
                    ORDER BY c.id DESC
                    LIMIT %s
                    """,
                    (citizen_id, mobile, email, limit),
                )
                complaints_rows = cursor.fetchall()
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    complaints_payload = []
    for row in complaints_rows:
        normalized_status = normalize_status(row["status"])
        complaints_payload.append(
            {
                "id": int(row["id"]),
                "tracking_code": row["tracking_code"],
                "title": row["title"],
                "priority": row["priority"],
                "category": row["category"],
                "department": row["department"],
                "state": row["state"],
                "city": row["city"],
                "pincode": row["pincode"],
                "status": normalized_status,
                "progress": get_status_progress(normalized_status),
                "attachment_count": int(row["attachment_count"] or 0),
                "created_at": row["created_at"].isoformat() if isinstance(row["created_at"], datetime) else row["created_at"],
                "updated_at": row["updated_at"].isoformat() if isinstance(row["updated_at"], datetime) else row["updated_at"],
            }
        )

    return jsonify({"count": len(complaints_payload), "complaints": complaints_payload})


@app.route("/api/stats/", methods=["GET"])
def stats():
    try:
        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT status, COUNT(*) FROM complaints GROUP BY status")
                submitted = 0
                processing = 0
                resolved = 0
                total = 0

                for row in cursor.fetchall():
                    status_label = normalize_status(row[0])
                    count = int(row[1] or 0)
                    total += count
                    if status_label == "Submitted":
                        submitted += count
                    elif status_label == "Processing":
                        processing += count
                    elif status_label == "Resolved":
                        resolved += count
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    return jsonify(
        {
            "total": total,
            "pending": submitted + processing,
            "submitted": submitted,
            "processing": processing,
            "resolved": resolved,
        }
    )


@app.route("/api/complaints/", methods=["POST", "GET"])
def complaints():
    if request.method == "POST":
        return create_complaint()
    return get_complaint()


def fetch_admin_complaints_data() -> list[dict[str, Any]]:
    return fetch_managed_complaints_data()


def clear_uploaded_files() -> int:
    ensure_uploads_dir()
    deleted_entries = 0

    for item in UPLOADS_DIR.iterdir():
        if item.is_dir():
            shutil.rmtree(item)
            deleted_entries += 1
            continue

        if item.exists():
            item.unlink()
            deleted_entries += 1

    return deleted_entries


CLEAR_DATA_SCOPES = {
    "all": {
        "label": "Everything",
        "tables": ("complaint_attachments", "complaint_updates", "complaints", "citizen_users"),
        "clear_uploads": True,
        "clear_otps": True,
    },
    "complaints": {
        "label": "Complaint Data",
        "tables": ("complaint_attachments", "complaint_updates", "complaints"),
        "clear_uploads": True,
        "clear_otps": False,
    },
    "citizens": {
        "label": "Citizen Signup Data",
        "tables": ("citizen_users",),
        "clear_uploads": False,
        "clear_otps": True,
    },
}


def get_clear_scope_config(scope: str | None) -> dict[str, Any] | None:
    return CLEAR_DATA_SCOPES.get((scope or "").strip().lower())


def clear_selected_stored_data(scope: str) -> dict[str, Any]:
    config = get_clear_scope_config(scope)
    if not config:
        raise ValueError("Invalid clear scope.")

    table_order = (
        "complaint_attachments",
        "complaint_updates",
        "complaints",
        "citizen_users",
    )
    target_tables = tuple(config["tables"])
    deleted_counts = {table_name: 0 for table_name in table_order}
    existing_tables: set[str] = set()

    with get_db_connection() as connection:
        ensure_citizen_users_table(connection)
        with connection.cursor(dictionary=True) as cursor:
            for table_name in target_tables:
                cursor.execute("SHOW TABLES LIKE %s", (table_name,))
                if cursor.fetchone():
                    existing_tables.add(table_name)
                    cursor.execute(f"SELECT COUNT(*) AS total FROM {table_name}")
                    result = cursor.fetchone() or {}
                    deleted_counts[table_name] = int(result.get("total") or 0)

            for table_name in table_order:
                if table_name in existing_tables:
                    cursor.execute(f"DELETE FROM {table_name}")

            for table_name in table_order:
                if table_name in existing_tables:
                    cursor.execute(f"ALTER TABLE {table_name} AUTO_INCREMENT = 1")

        connection.commit()

    deleted_counts["upload_files"] = clear_uploaded_files() if config["clear_uploads"] else 0
    if config["clear_otps"]:
        OTP_STORE.clear()

    deleted_counts["scope"] = scope
    deleted_counts["scope_label"] = str(config["label"])
    return deleted_counts


def serialize_admin_complaint_row(row: dict[str, Any]) -> dict[str, Any]:
    normalized_status = normalize_status(row["status"])
    latitude = to_float(row.get("latitude"))
    longitude = to_float(row.get("longitude"))
    geo_accuracy_raw = row.get("geo_accuracy")
    try:
        geo_accuracy = int(geo_accuracy_raw) if geo_accuracy_raw is not None else None
    except (TypeError, ValueError):
        geo_accuracy = None

    return {
        "id": int(row["id"]),
        "tracking_code": row["tracking_code"],
        "name": row["name"],
        "email": row["email"],
        "phone": row["phone"],
        "state": row["state"],
        "city": row["city"],
        "pincode": row["pincode"],
        "area": str(row.get("area") or ""),
        "location_text": str(row.get("location_text") or row.get("area") or ""),
        "latitude": latitude,
        "longitude": longitude,
        "geo_accuracy": geo_accuracy,
        "gps_label": (
            f"{latitude:.5f}, {longitude:.5f}"
            if latitude is not None and longitude is not None
            else ""
        ),
        "title": row["title"],
        "priority": row["priority"],
        "category": row["category"],
        "department": row["department"],
        "status": normalized_status,
        "progress": get_status_progress(normalized_status),
        "created_at": row["created_at"].strftime("%d %b %Y %I:%M %p") if isinstance(row["created_at"], datetime) else row["created_at"],
        "attachment_count": int(row["attachment_count"] or 0),
    }


def delete_managed_upload_file(file_path: str | None) -> bool:
    if not file_path:
        return False

    candidate = Path(file_path).resolve(strict=False)
    uploads_root = UPLOADS_DIR.resolve(strict=False)
    try:
        candidate.relative_to(uploads_root)
    except ValueError:
        return False

    if not candidate.exists() or not candidate.is_file():
        return False

    candidate.unlink()
    return True


def delete_complaint_record(complaint_id: int, admin_username: str | None = None) -> dict[str, Any]:
    attachment_files: list[str] = []

    with get_db_connection() as connection:
        ensure_admin_activity_logs_table(connection)
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute(
                "SELECT id, tracking_code FROM complaints WHERE id = %s LIMIT 1",
                (complaint_id,),
            )
            complaint = cursor.fetchone()
            if not complaint:
                raise LookupError("Complaint not found.")

            cursor.execute(
                "SELECT file_path FROM complaint_attachments WHERE complaint_id = %s",
                (complaint_id,),
            )
            attachment_rows = cursor.fetchall()
            attachment_files = [str(row.get("file_path") or "") for row in attachment_rows]

            cursor.execute(
                "SELECT COUNT(*) AS total FROM complaint_updates WHERE complaint_id = %s",
                (complaint_id,),
            )
            update_count = int((cursor.fetchone() or {}).get("total") or 0)

            cursor.execute(
                "DELETE FROM complaints WHERE id = %s LIMIT 1",
                (complaint_id,),
            )
            log_admin_activity(
                connection,
                action_type="complaint_delete",
                details=(
                    f"{complaint['tracking_code']} complaint deleted. "
                    f"{update_count} updates and {len(attachment_files)} attachment records were removed."
                ),
                admin_username=admin_username,
                complaint_id=complaint_id,
                tracking_code=str(complaint["tracking_code"]),
            )
            connection.commit()

    deleted_upload_files = 0
    for file_path in attachment_files:
        try:
            if delete_managed_upload_file(file_path):
                deleted_upload_files += 1
        except OSError:
            continue

    return {
        "tracking_code": str(complaint["tracking_code"]),
        "attachment_count": len(attachment_files),
        "update_count": update_count,
        "deleted_upload_files": deleted_upload_files,
    }


@app.route("/admin/manage", methods=["GET"])
def admin_manage_page():
    if not is_admin_logged_in():
        return redirect(url_for("admin_login"))

    query = request.args.get("q", "").strip().lower()
    message = request.args.get("message", "").strip()
    message_type = request.args.get("type", "info").strip().lower()
    if message_type not in {"info", "error"}:
        message_type = "info"

    try:
        complaints_data = [serialize_admin_complaint_row(row) for row in fetch_admin_complaints_data()]
    except Error as exc:
        complaints_data = []
        message = f"Database error: {exc}"
        message_type = "error"

    if query:
        complaints_data = [
            item
            for item in complaints_data
            if query in " ".join(
                [
                    str(item["tracking_code"]),
                    str(item["name"]),
                    str(item["phone"]),
                    str(item["title"]),
                    str(item["city"]),
                    str(item["department"]),
                ]
            ).lower()
        ]

    total_count = len(complaints_data)
    submitted_count = sum(1 for item in complaints_data if item["status"] == "Submitted")
    processing_count = sum(1 for item in complaints_data if item["status"] == "Processing")
    resolved_count = sum(1 for item in complaints_data if item["status"] == "Resolved")

    try:
        activity_logs = fetch_recent_admin_activity(limit=8)
    except Error as exc:
        activity_logs = []
        if not message:
            message = f"Admin activity fetch nahi ho payi: {exc}"
            message_type = "error"

    page_html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ brand }} Admin Manage</title>
    <style>
        :root {
            --navy: #102542;
            --blue: #1f4e79;
            --gold: #f0b429;
            --bg: #f5f7fb;
            --card: #ffffff;
            --text: #1f2937;
            --muted: #6b7280;
            --border: #d8dee9;
            --success: #0f766e;
            --warning: #b45309;
            --info-bg: #e8f1ff;
            --info-text: #174ea6;
            --error-bg: #fdecec;
            --error-text: #b42318;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, sans-serif;
            background: linear-gradient(180deg, #eef4fb 0%, #f9fbfd 100%);
            color: var(--text);
        }

        .wrap {
            max-width: 1320px;
            margin: 0 auto;
            padding: 24px;
        }

        .hero {
            position: relative;
            overflow: hidden;
            background:
                radial-gradient(circle at 12% 18%, rgba(240, 180, 41, 0.18), transparent 28%),
                radial-gradient(circle at 88% 18%, rgba(255,255,255,0.12), transparent 24%),
                linear-gradient(135deg, #102542 0%, #16345a 46%, #1f4e79 100%);
            color: white;
            padding: 28px;
            border-radius: 24px;
            box-shadow: 0 22px 44px rgba(16, 37, 66, 0.18);
        }

        .hero::after {
            content: '';
            position: absolute;
            inset: 0;
            background:
                linear-gradient(120deg, rgba(255,255,255,0.08), transparent 42%),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 120px);
            pointer-events: none;
        }

        .hero > * {
            position: relative;
            z-index: 1;
        }

        .hero h1 {
            margin: 0 0 8px;
            font-size: 2rem;
        }

        .hero p {
            margin: 0;
            color: rgba(255, 255, 255, 0.88);
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            margin-bottom: 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.14);
            color: rgba(255,255,255,0.96);
            font-size: 0.82rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 18px;
        }

        .actions form {
            margin: 0;
            flex: 1 1 190px;
        }

        .btn, .search-btn, .status-btn {
            border: none;
            border-radius: 999px;
            padding: 10px 18px;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
        }

        .actions > .btn,
        .actions form .btn {
            width: 100%;
            min-height: 52px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            flex: 1 1 190px;
        }

        .btn-primary, .search-btn {
            background: var(--gold);
            color: #1a1a1a;
        }

        .btn-danger {
            background: #b42318;
            color: white;
            border: 1px solid rgba(255,255,255,0.18);
        }

        .btn-secondary {
            background: rgba(255,255,255,0.14);
            color: white;
            border: 1px solid rgba(255,255,255,0.22);
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin: 22px 0;
        }

        .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 18px;
            box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
        }

        .stat-label {
            color: var(--muted);
            font-size: 0.92rem;
        }

        .stat-value {
            margin-top: 8px;
            font-size: 1.9rem;
            font-weight: 800;
        }

        .activity-card {
            display: none !important;
        }

        .activity-head {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            align-items: flex-start;
            flex-wrap: wrap;
            margin-bottom: 18px;
        }

        .activity-head h2 {
            margin: 0 0 6px;
            font-size: 1.2rem;
            color: var(--navy);
        }

        .activity-head p {
            margin: 0;
            color: var(--muted);
        }

        .activity-count {
            display: inline-flex;
            align-items: center;
            padding: 8px 12px;
            border-radius: 999px;
            background: #eef4ff;
            color: #174ea6;
            font-size: 0.82rem;
            font-weight: 800;
        }

        .activity-list {
            display: grid;
            gap: 12px;
        }

        .activity-item {
            padding: 14px 16px;
            border: 1px solid #e6edf5;
            border-radius: 16px;
            background: linear-gradient(180deg, #ffffff, #f8fbff);
        }

        .activity-item-top {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 6px;
        }

        .activity-item-top strong {
            color: var(--navy);
        }

        .activity-item-top span {
            color: var(--muted);
            font-size: 0.86rem;
            font-weight: 700;
        }

        .message {
            padding: 12px 14px;
            border-radius: 12px;
            margin-bottom: 14px;
        }

        .message.info {
            background: var(--info-bg);
            color: var(--info-text);
        }

        .message.error {
            background: var(--error-bg);
            color: var(--error-text);
        }

        .row-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
        }

        .row-action-form {
            margin: 0;
        }

        .row-delete-btn {
            width: 100%;
            border: 1px solid rgba(180, 35, 24, 0.16);
            background: linear-gradient(135deg, #fff1f2, #fee2e2);
            color: #b42318;
            border-radius: 999px;
            padding: 9px 12px;
            font-size: 0.82rem;
            font-weight: 800;
            cursor: pointer;
        }

        .row-delete-btn:hover {
            box-shadow: 0 10px 18px rgba(180, 35, 24, 0.14);
        }

        .toolbar {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 16px;
        }

        .search {
            flex: 1;
            min-width: 260px;
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 12px 14px;
            font-size: 1rem;
        }

        .table-wrap {
            overflow: auto;
            background: white;
            border-radius: 16px;
            border: 1px solid var(--border);
            box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 1100px;
        }

        th, td {
            padding: 14px 12px;
            border-bottom: 1px solid #edf2f7;
            text-align: left;
            vertical-align: top;
        }

        th {
            background: #f8fafc;
            position: sticky;
            top: 0;
            z-index: 1;
            font-size: 0.92rem;
        }

        .badge {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 700;
        }

        .badge.submitted {
            background: #fff7e6;
            color: var(--warning);
        }

        .badge.processing {
            background: #e8f1ff;
            color: #174ea6;
        }

        .badge.resolved {
            background: #ecfdf3;
            color: var(--success);
        }

        .muted {
            color: var(--muted);
            font-size: 0.9rem;
        }

        .status-actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 10px;
        }

        .status-form {
            margin: 0;
        }

        .status-btn {
            padding: 7px 12px;
            font-size: 0.82rem;
            border: 1px solid var(--border);
            background: #f8fafc;
            color: var(--text);
        }

        .status-btn.submitted {
            border-color: #f3d38b;
            color: #8a5a00;
            background: #fff8e8;
        }

        .status-btn.processing {
            border-color: #a9c5ff;
            color: #174ea6;
            background: #eef4ff;
        }

        .status-btn.resolved {
            border-color: #a7e0bf;
            color: #0f766e;
            background: #effdf5;
        }

        .status-btn.active {
            box-shadow: inset 0 0 0 2px rgba(16, 37, 66, 0.12);
            cursor: default;
        }

        @media (max-width: 768px) {
            .wrap {
                padding: 16px;
            }

            .hero h1 {
                font-size: 1.5rem;
            }

        }
    </style>
</head>
<body>
    <div class="wrap">
        <section class="hero">
            <span class="hero-badge">Admin Control Center</span>
            <h1>{{ brand }} Admin Manage</h1>
            <p>Complaint status manage karein, records review karein, aur har complaint ko selective tarike se delete bhi yahin se karein.</p>
            <div class="actions">
                <a class="btn btn-primary" href="{{ url_for('admin_manage_page') }}">Refresh Data</a>
                <a class="btn btn-secondary" href="{{ url_for('admin_logout') }}">Logout</a>
                <a class="btn btn-secondary" href="{{ url_for('index') }}">Open Main Site</a>
            </div>
        </section>

        <section class="stats">
            <div class="card">
                <div class="stat-label">Total Complaints</div>
                <div class="stat-value">{{ total_count }}</div>
            </div>
            <div class="card">
                <div class="stat-label">Submitted</div>
                <div class="stat-value">{{ submitted_count }}</div>
            </div>
            <div class="card">
                <div class="stat-label">Processing</div>
                <div class="stat-value">{{ processing_count }}</div>
            </div>
            <div class="card">
                <div class="stat-label">Resolved</div>
                <div class="stat-value">{{ resolved_count }}</div>
            </div>
        </section>

        {% if message %}
            <div class="message {{ message_type }}">{{ message }}</div>
        {% endif %}

        <section class="card activity-card">
            <div class="activity-head">
                <div>
                    <h2>Recent Admin Activity</h2>
                    <p>Portal me jo bhi key admin action hua hai uska recent audit trail yahan dikh raha hai.</p>
                </div>
                <span class="activity-count">{{ activity_logs|length }} recent entries</span>
            </div>
            <div class="activity-list">
                {% if activity_logs %}
                    {% for log in activity_logs %}
                        <div class="activity-item">
                            <div class="activity-item-top">
                                <strong>{{ log.action_label }}{% if log.tracking_code %} • {{ log.tracking_code }}{% endif %}</strong>
                                <span>{{ log.created_at }}</span>
                            </div>
                            <div class="muted">{{ log.message }}</div>
                        </div>
                    {% endfor %}
                {% else %}
                    <div class="muted">Abhi tak koi admin activity record nahi hui hai.</div>
                {% endif %}
            </div>
        </section>

        <section class="card">
            <form class="toolbar" method="get" action="{{ url_for('admin_manage_page') }}">
                <input class="search" type="text" name="q" value="{{ query }}" placeholder="Search by tracking ID, name, phone, title, city..." />
                <button class="search-btn" type="submit">Apply Filter</button>
            </form>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tracking ID</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Complaint</th>
                            <th>Location</th>
                            <th>Status Flow</th>
                            <th>Actions</th>
                            <th>Files</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% if complaints %}
                            {% for item in complaints %}
                                <tr>
                                    <td>{{ item.id }}</td>
                                    <td><strong>{{ item.tracking_code }}</strong></td>
                                    <td>
                                        <strong>{{ item.name }}</strong><br>
                                        <span class="muted">{{ item.email }}</span>
                                    </td>
                                    <td>{{ item.phone }}</td>
                                    <td>
                                        <strong>{{ item.title }}</strong><br>
                                        <span class="muted">{{ item.category }} | {{ item.priority }} | {{ item.department }}</span>
                                    </td>
                                    <td>
                                        {% if item.location_text %}
                                            {{ item.location_text }}<br>
                                        {% else %}
                                            {{ item.city }}, {{ item.state }}<br>
                                        {% endif %}
                                        <span class="muted">
                                            PIN: {{ item.pincode }}
                                            {% if item.gps_label %} • GPS: {{ item.gps_label }}{% endif %}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge {{ item.status|lower }}">{{ item.status }}</span>
                                        <div class="status-actions">
                                            {% for status in status_flow %}
                                                <form class="status-form" method="post" action="{{ url_for('admin_manage_update_status', complaint_id=item.id) }}">
                                                    <input type="hidden" name="status" value="{{ status }}">
                                                    <input type="hidden" name="q" value="{{ query }}">
                                                    <button
                                                        class="status-btn {{ status|lower }}{% if item.status == status %} active{% endif %}"
                                                        type="submit"
                                                        {% if item.status == status %}disabled{% endif %}
                                                    >{{ status }}</button>
                                                </form>
                                            {% endfor %}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="row-actions">
                                            <form class="row-action-form" method="post" action="{{ url_for('admin_manage_delete_complaint', complaint_id=item.id) }}" onsubmit="return confirm('Kya aap {{ item.tracking_code }} complaint delete karna chahte ho? Iske updates aur files bhi remove ho jayenge.');">
                                                <input type="hidden" name="q" value="{{ query }}">
                                                <button class="row-delete-btn" type="submit">Delete Complaint</button>
                                            </form>
                                        </div>
                                    </td>
                                    <td>{{ item.attachment_count }}</td>
                                    <td>{{ item.created_at }}</td>
                                </tr>
                            {% endfor %}
                        {% else %}
                            <tr>
                                <td colspan="10" class="muted">No complaints found for this filter.</td>
                            </tr>
                        {% endif %}
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</body>
</html>
"""

    response = make_response(
        render_template_string(
            page_html,
            brand="𝒆 𝑺𝒂𝒉𝒚𝒐𝒈𝒊",
            complaints=complaints_data,
            total_count=total_count,
            submitted_count=submitted_count,
            processing_count=processing_count,
            resolved_count=resolved_count,
            message=message,
            message_type=message_type,
            query=query,
            activity_logs=activity_logs,
            status_flow=COMPLAINT_STATUS_FLOW,
        )
    )
    response.headers["Cache-Control"] = "no-store"
    return response


@app.route("/admin/manage/<int:complaint_id>/status", methods=["POST"])
def admin_manage_update_status(complaint_id: int):
    if not is_admin_logged_in():
        return redirect(url_for("admin_login"))

    requested_status = normalize_status(request.form.get("status", ""))
    query = request.form.get("q", "").strip()

    if requested_status not in COMPLAINT_STATUS_FLOW:
        return redirect(
            url_for(
                "admin_manage_page",
                message="Status must be Submitted, Processing or Resolved.",
                type="error",
                q=query,
            )
        )

    description = get_status_update_description(requested_status)
    notification_note = ""

    try:
        with get_db_connection() as connection:
            ensure_admin_activity_logs_table(connection)
            complaint, status_changed = update_managed_complaint_status(
                connection,
                complaint_id,
                requested_status,
                description,
                actor_type="admin",
                actor_username=str(session.get("admin_username") or ADMIN_USERNAME),
            )
            tracking_code = complaint["tracking_code"]
    except Error as exc:
        return redirect(
            url_for(
                "admin_manage_page",
                message=f"Database error: {exc}",
                type="error",
                q=query,
            )
        )
    except LookupError:
        return redirect(
            url_for(
                "admin_manage_page",
                message="Complaint not found.",
                type="error",
                q=query,
            )
        )

    if status_changed:
        notify_complaint_contact(complaint, description=description)
        notification_note = " Citizen notification was also triggered."

    return redirect(
        url_for(
            "admin_manage_page",
            message=f"{tracking_code} updated to {requested_status}.{notification_note}",
            type="info",
            q=query,
        )
        )


@app.route("/officer/manage/<int:complaint_id>/status", methods=["POST"])
def officer_update_status(complaint_id: int):
    officer = get_officer_session()
    if not officer:
        return redirect(url_for("officer_login"))

    requested_status = normalize_status(request.form.get("status", ""))
    query = request.form.get("q", "").strip()

    if requested_status not in COMPLAINT_STATUS_FLOW:
        return redirect(
            url_for(
                "officer_page",
                message="Status must be Submitted, Processing or Resolved.",
                type="error",
                q=query,
            )
        )

    description = get_status_update_description(requested_status)
    notification_note = ""

    try:
        with get_db_connection() as connection:
            ensure_admin_activity_logs_table(connection)
            complaint, status_changed = update_managed_complaint_status(
                connection,
                complaint_id,
                requested_status,
                description,
                actor_type="officer",
                actor_username=officer["username"],
                department=officer["department"],
            )
            tracking_code = complaint["tracking_code"]
    except Error as exc:
        return redirect(
            url_for(
                "officer_page",
                message=f"Database error: {exc}",
                type="error",
                q=query,
            )
        )
    except LookupError:
        return redirect(
            url_for(
                "officer_page",
                message="Complaint not found for your department.",
                type="error",
                q=query,
            )
        )

    if status_changed:
        notify_complaint_contact(complaint, description=description)
        notification_note = " Citizen notification was also triggered."

    return redirect(
        url_for(
            "officer_page",
            message=f"{tracking_code} updated to {requested_status}.{notification_note}",
            type="info",
            q=query,
        )
    )


@app.route("/admin/manage/<int:complaint_id>/delete", methods=["POST"])
def admin_manage_delete_complaint(complaint_id: int):
    if not is_admin_logged_in():
        return redirect(url_for("admin_login"))

    query = request.form.get("q", "").strip()

    try:
        deleted = delete_complaint_record(complaint_id, admin_username=session.get("admin_username"))
    except LookupError:
        return redirect(
            url_for(
                "admin_manage_page",
                message="Complaint not found.",
                type="error",
                q=query,
            )
        )
    except Error as exc:
        return redirect(
            url_for(
                "admin_manage_page",
                message=f"Complaint delete nahi ho payi: {exc}",
                type="error",
                q=query,
            )
        )

    return redirect(
        url_for(
            "admin_manage_page",
            message=(
                f"{deleted['tracking_code']} deleted successfully. "
                f"{deleted['update_count']} updates aur {deleted['deleted_upload_files']} upload files remove hue."
            ),
            type="info",
            q=query,
        )
    )


@app.route("/admin/manage/clear-data", methods=["POST"])
def admin_manage_clear_data():
    if not is_admin_logged_in():
        return redirect(url_for("admin_login"))

    scope = request.form.get("scope", "all").strip().lower()
    config = get_clear_scope_config(scope)
    if not config:
        return redirect(
            url_for(
                "admin_manage_page",
                message="Please select a valid delete option.",
                type="error",
                clear_scope="all",
            )
        )

    try:
        deleted = clear_selected_stored_data(scope)
    except (Error, OSError, ValueError) as exc:
        return redirect(
            url_for(
                "admin_manage_page",
                message=f"Selected data clear nahi ho paya: {exc}",
                type="error",
                clear_scope=scope,
            )
        )

    session.pop("citizen_user", None)
    try:
        with get_db_connection() as connection:
            log_admin_activity(
                connection,
                action_type="data_cleanup",
                details=(
                    f"{deleted['scope_label']} cleanup run. "
                    f"{deleted['complaints']} complaints, {deleted['complaint_updates']} updates, "
                    f"{deleted['complaint_attachments']} attachments, {deleted['citizen_users']} citizens "
                    f"and {deleted['upload_files']} upload files cleared."
                ),
                admin_username=session.get("admin_username"),
            )
            connection.commit()
    except Error:
        pass
    message = (
        f"{deleted['scope_label']} cleared successfully. "
        f"{deleted['complaints']} complaints, {deleted['complaint_updates']} updates, "
        f"{deleted['complaint_attachments']} attachments, {deleted['citizen_users']} citizens "
        f"aur {deleted['upload_files']} upload files delete hue."
    )
    return redirect(url_for("admin_manage_page", message=message, type="info", clear_scope=scope))


@app.route("/api/admin/complaints/", methods=["GET"])
def admin_complaints():
    if not is_admin_logged_in():
        return admin_unauthorized()
    try:
        complaints_data = fetch_admin_complaints_data()
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    serialized = [serialize_admin_complaint_row(row) for row in complaints_data]

    return jsonify(
        {
            "count": len(serialized),
            "complaints": serialized,
            "admin_user": session.get("admin_username", ADMIN_USERNAME),
        }
    )


@app.route("/api/admin/activity/", methods=["GET"])
def admin_activity():
    if not is_admin_logged_in():
        return admin_unauthorized()
    try:
        activity_logs = fetch_recent_admin_activity(limit=request.args.get("limit", 10))
    except (Error, ValueError) as exc:
        return json_error(f"Activity log fetch nahi ho paya: {exc}", 500)
    return jsonify({"count": len(activity_logs), "activity": activity_logs})


@app.route("/api/admin/clear-data/", methods=["POST"])
def admin_clear_all_data():
    if not is_admin_logged_in():
        return admin_unauthorized()

    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    scope = str(payload.get("scope", "all")).strip().lower()
    config = get_clear_scope_config(scope)
    if not config:
        return json_error("Please select a valid delete option.", 422)

    try:
        deleted = clear_selected_stored_data(scope)
    except (Error, OSError, ValueError) as exc:
        return json_error(f"Selected data clear nahi ho paya: {exc}", 500)

    session.pop("citizen_user", None)
    try:
        with get_db_connection() as connection:
            log_admin_activity(
                connection,
                action_type="data_cleanup",
                details=(
                    f"{deleted['scope_label']} cleanup run. "
                    f"{deleted['complaints']} complaints, {deleted['complaint_updates']} updates, "
                    f"{deleted['complaint_attachments']} attachments, {deleted['citizen_users']} citizens "
                    f"and {deleted['upload_files']} upload files cleared."
                ),
                admin_username=session.get("admin_username"),
            )
            connection.commit()
    except Error:
        pass
    return jsonify(
        {
            "message": f"{deleted['scope_label']} cleared successfully.",
            "deleted": deleted,
        }
    )


@app.route("/api/admin/complaints/<int:complaint_id>/delete/", methods=["POST"])
def admin_delete_complaint(complaint_id: int):
    if not is_admin_logged_in():
        return admin_unauthorized()

    try:
        deleted = delete_complaint_record(complaint_id, admin_username=session.get("admin_username"))
    except LookupError:
        return json_error("Complaint not found.", 404)
    except Error as exc:
        return json_error(f"Complaint delete nahi ho payi: {exc}", 500)

    return jsonify(
        {
            "message": f"{deleted['tracking_code']} deleted successfully.",
            "deleted": deleted,
        }
    )


@app.route("/api/admin/complaints/<int:complaint_id>/status/", methods=["POST"])
def admin_update_complaint_status(complaint_id: int):
    if not is_admin_logged_in():
        return admin_unauthorized()

    payload = request.get_json(silent=True)
    if payload is None:
        payload = request.form

    requested_status = normalize_status(str(payload.get("status", "")))
    if requested_status not in COMPLAINT_STATUS_FLOW:
        return json_error("Status must be Submitted, Processing or Resolved.", 422)

    description = str(payload.get("description", "")).strip() or get_status_update_description(requested_status)

    try:
        with get_db_connection() as connection:
            ensure_admin_activity_logs_table(connection)
            complaint, status_changed = update_managed_complaint_status(
                connection,
                complaint_id,
                requested_status,
                description,
                actor_type="admin",
                actor_username=str(session.get("admin_username") or ADMIN_USERNAME),
            )
            normalized_status = normalize_status(complaint["status"])
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)
    except LookupError:
        return json_error("Complaint not found.", 404)

    notification_result = None
    if status_changed:
        notification_result = notify_complaint_contact(complaint, description=description)

    serialized = {
        "id": int(complaint["id"]),
        "tracking_code": complaint["tracking_code"],
        "name": complaint["name"],
        "email": complaint["email"],
        "phone": complaint["phone"],
        "state": complaint["state"],
        "city": complaint["city"],
        "pincode": complaint["pincode"],
        "area": complaint.get("area"),
        "location_text": complaint.get("location_text"),
        "latitude": to_float(complaint.get("latitude")),
        "longitude": to_float(complaint.get("longitude")),
        "geo_accuracy": int(complaint["geo_accuracy"]) if complaint.get("geo_accuracy") is not None else None,
        "title": complaint["title"],
        "priority": complaint["priority"],
        "category": complaint["category"],
        "department": complaint["department"],
        "status": normalized_status,
        "progress": get_status_progress(normalized_status),
        "created_at": complaint["created_at"].strftime("%d %b %Y %I:%M %p") if isinstance(complaint["created_at"], datetime) else complaint["created_at"],
        "attachment_count": int(complaint["attachment_count"] or 0),
    }

    return jsonify(
        {
            "message": f"Complaint status updated to {normalized_status}.",
            "complaint": serialized,
            "notification": notification_result,
        }
    )


def create_complaint():
    citizen = get_citizen_session()
    if not citizen:
        return citizen_unauthorized()

    required_fields = [
        "state",
        "city",
        "pincode",
        "title",
        "priority",
        "category",
        "department",
        "description",
    ]

    data: dict[str, str] = {
        "name": citizen["name"],
        "email": citizen["email"],
        "phone": citizen["phone"],
    }
    for field in required_fields:
        value = request.form.get(field, "").strip()
        if not value:
            return json_error(f"Missing field: {field}", 422)
        data[field] = value

    data["area"] = request.form.get("area", "").strip()
    data["location"] = request.form.get("location", "").strip() or data["area"]
    latitude = to_float(request.form.get("latitude", "").strip())
    longitude = to_float(request.form.get("longitude", "").strip())
    geo_accuracy_value = request.form.get("geo_accuracy", "").strip()
    try:
        geo_accuracy = int(round(float(geo_accuracy_value))) if geo_accuracy_value else None
    except (TypeError, ValueError):
        return json_error("Invalid GPS accuracy value", 422)

    if not data["location"]:
        return json_error("Missing field: location", 422)

    has_any_geo = latitude is not None or longitude is not None or geo_accuracy is not None
    if has_any_geo and (latitude is None or longitude is None):
        return json_error("Incomplete GPS coordinates received", 422)
    if latitude is not None and not (-90 <= latitude <= 90):
        return json_error("Invalid latitude value", 422)
    if longitude is not None and not (-180 <= longitude <= 180):
        return json_error("Invalid longitude value", 422)
    if geo_accuracy is not None and geo_accuracy < 0:
        return json_error("Invalid GPS accuracy value", 422)

    if not is_valid_email(data["email"]):
        return json_error("Invalid email address", 422)

    if not (data["phone"].isdigit() and len(data["phone"]) == 10):
        return json_error("Phone number must be 10 digits", 422)

    if not (data["pincode"].isdigit() and len(data["pincode"]) == 6):
        return json_error("PIN code must be 6 digits", 422)

    tracking_code = generate_tracking_code()
    ensure_uploads_dir()

    try:
        with get_db_connection() as connection:
            ensure_citizen_users_table(connection)
            ensure_complaints_schema(connection)
            recent_complaint_count = count_recent_citizen_complaints(connection, citizen)
            if recent_complaint_count >= COMPLAINT_SUBMIT_LIMIT_PER_WINDOW:
                return json_error(
                    (
                        f"Aap {COMPLAINT_SUBMIT_WINDOW_MINUTES} minutes me "
                        f"{COMPLAINT_SUBMIT_LIMIT_PER_WINDOW} complaints se zyada submit nahi kar sakte."
                    ),
                    429,
                )

            duplicate_complaint = find_recent_duplicate_complaint(connection, citizen, data)
            if duplicate_complaint:
                duplicate_status = normalize_status(duplicate_complaint["status"])
                created_at = duplicate_complaint["created_at"]
                created_label = created_at.strftime("%d %b %Y %I:%M %p") if isinstance(created_at, datetime) else str(created_at)
                response = jsonify(
                    {
                        "error": (
                            f"Aap is issue se milti-julti complaint pehle hi file kar chuke hain. "
                            f"Existing tracking ID: {duplicate_complaint['tracking_code']}"
                        ),
                        "duplicate": True,
                        "existing_tracking_code": duplicate_complaint["tracking_code"],
                        "existing_status": duplicate_status,
                        "existing_created_at": created_label,
                    }
                )
                response.status_code = 409
                return response

            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    INSERT INTO complaints
                    (citizen_user_id, tracking_code, name, email, phone, state, city, pincode, area, location_text,
                     latitude, longitude, geo_accuracy, title, priority, category, department, description, status)
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        int(str(citizen.get("id", "0") or "0")) or None,
                        tracking_code,
                        data["name"],
                        data["email"],
                        data["phone"],
                        data["state"],
                        data["city"],
                        data["pincode"],
                        data["area"],
                        data["location"],
                        latitude,
                        longitude,
                        geo_accuracy,
                        data["title"],
                        data["priority"],
                        data["category"],
                        data["department"],
                        data["description"],
                        "Submitted",
                    ),
                )
                complaint_id = int(cursor.lastrowid)

                cursor.execute(
                    """
                    INSERT INTO complaint_updates (complaint_id, status, description)
                    VALUES (%s, %s, %s)
                    """,
                    (
                        complaint_id,
                        "Submitted",
                        get_status_update_description("Submitted"),
                    ),
                )

                for upload in request.files.getlist("files"):
                    if not upload or not upload.filename:
                        continue

                    content_type = upload.content_type or "application/octet-stream"
                    if not allowed_upload(content_type):
                        continue

                    upload.stream.seek(0, os.SEEK_END)
                    file_size = upload.stream.tell()
                    upload.stream.seek(0)

                    if file_size <= 0 or file_size > MAX_FILE_SIZE:
                        continue

                    safe_name = "".join(ch if ch.isalnum() or ch in "._-" else "_" for ch in upload.filename)
                    stored_name = f"{tracking_code}_{secrets.token_hex(6)}_{safe_name}"
                    saved_path = UPLOADS_DIR / stored_name
                    upload.save(saved_path)

                    cursor.execute(
                        """
                        INSERT INTO complaint_attachments
                        (complaint_id, original_name, file_name, file_path, file_type, file_size)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        """,
                        (
                            complaint_id,
                            upload.filename,
                            stored_name,
                            str(saved_path),
                            content_type,
                            file_size,
                        ),
                    )

            connection.commit()
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    notification_result = notify_complaint_contact(
        {
            "tracking_code": tracking_code,
            "status": "Submitted",
            "department": data["department"],
            "phone": data["phone"],
            "email": data["email"],
        },
        description=get_status_update_description("Submitted"),
    )

    return jsonify(
        {
            "id": complaint_id,
            "code": tracking_code,
            "status": "Submitted",
            "message": "Complaint registered successfully",
            "notification": notification_result,
        }
    ), 201


def get_complaint():
    tracking_id = request.args.get("tracking_id", "").strip().upper()
    if not tracking_id:
        return json_error("tracking_id is required", 422)

    try:
        with get_db_connection() as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    SELECT id, tracking_code, name, email, phone, state, city, pincode, area, location_text,
                           latitude, longitude, geo_accuracy, title, priority, category, department, description,
                           status, created_at, updated_at
                    FROM complaints
                    WHERE tracking_code = %s
                    LIMIT 1
                    """,
                    (tracking_id,),
                )
                complaint = cursor.fetchone()

                if not complaint:
                    return json_error("Complaint not found", 404)

                cursor.execute(
                    """
                    SELECT status, description, created_at
                    FROM complaint_updates
                    WHERE complaint_id = %s
                    ORDER BY created_at ASC, id ASC
                    """,
                    (complaint["id"],),
                )
                updates = [
                    {
                        "date": row["created_at"].strftime("%d %b %Y %I:%M %p"),
                        "status": row["status"],
                        "description": row["description"],
                    }
                    for row in cursor.fetchall()
                ]

                cursor.execute(
                    """
                    SELECT original_name, file_name, file_type, file_size, uploaded_at
                    FROM complaint_attachments
                    WHERE complaint_id = %s
                    ORDER BY id ASC
                    """,
                    (complaint["id"],),
                )
                attachments = [
                    {
                        "name": row["original_name"],
                        "type": row["file_type"],
                        "size": int(row["file_size"]),
                        "uploaded_at": row["uploaded_at"].isoformat() if isinstance(row["uploaded_at"], datetime) else row["uploaded_at"],
                        "url": f"/uploads/{row['file_name']}",
                    }
                    for row in cursor.fetchall()
                ]
    except Error as exc:
        return json_error(f"Database error: {exc}", 500)

    payload: dict[str, Any] = {
        "id": int(complaint["id"]),
        "code": complaint["tracking_code"],
        "name": complaint["name"],
        "email": complaint["email"],
        "phone": complaint["phone"],
        "state": complaint["state"],
        "city": complaint["city"],
        "pincode": complaint["pincode"],
        "area": complaint["area"],
        "location": complaint["location_text"],
        "latitude": to_float(complaint.get("latitude")),
        "longitude": to_float(complaint.get("longitude")),
        "geo_accuracy": int(complaint["geo_accuracy"]) if complaint.get("geo_accuracy") is not None else None,
        "title": complaint["title"],
        "priority": complaint["priority"],
        "category": complaint["category"],
        "department": complaint["department"],
        "description": complaint["description"],
        "status": normalize_status(complaint["status"]),
        "progress": get_status_progress(complaint["status"]),
        "created": complaint["created_at"].isoformat() if isinstance(complaint["created_at"], datetime) else complaint["created_at"],
        "created_at": complaint["created_at"].isoformat() if isinstance(complaint["created_at"], datetime) else complaint["created_at"],
        "updated_at": complaint["updated_at"].isoformat() if isinstance(complaint["updated_at"], datetime) else complaint["updated_at"],
        "updates": updates,
        "attachments": attachments,
    }
    return jsonify(payload)


@app.route("/uploads/<path:filename>")
def uploaded_file(filename: str):
    return send_from_directory(UPLOADS_DIR, filename)


if __name__ == "__main__":
    ensure_uploads_dir()
    port = int(os.environ.get("PORT", "5000") or 5000)
    app.run(host="0.0.0.0", port=port, debug=False, use_reloader=False)
