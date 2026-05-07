CREATE DATABASE IF NOT EXISTS esahyogi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE esahyogi_db;

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
);

CREATE TABLE IF NOT EXISTS complaints (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    citizen_user_id INT UNSIGNED DEFAULT NULL,
    tracking_code VARCHAR(20) NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    state VARCHAR(120) NOT NULL,
    city VARCHAR(120) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    area VARCHAR(150) DEFAULT NULL,
    location_text VARCHAR(255) DEFAULT NULL,
    latitude DECIMAL(10,7) DEFAULT NULL,
    longitude DECIMAL(10,7) DEFAULT NULL,
    geo_accuracy INT UNSIGNED DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    category VARCHAR(120) NOT NULL,
    department VARCHAR(120) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Submitted',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_complaints_tracking_code (tracking_code),
    KEY idx_complaints_citizen_user_id (citizen_user_id),
    KEY idx_complaints_status (status),
    KEY idx_complaints_department (department),
    KEY idx_complaints_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS complaint_updates (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    complaint_id INT UNSIGNED NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_updates_complaint_id (complaint_id),
    CONSTRAINT fk_updates_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS complaint_attachments (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    complaint_id INT UNSIGNED NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT UNSIGNED NOT NULL DEFAULT 0,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_attachments_complaint_id (complaint_id),
    CONSTRAINT fk_attachments_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE
);

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
);
