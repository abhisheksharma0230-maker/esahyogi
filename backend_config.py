import os
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parent
UPLOADS_DIR = ROOT_DIR / "uploads"
MAX_FILE_SIZE = 10 * 1024 * 1024
SECRET_KEY = os.environ.get("SECRET_KEY", "esahyogi-admin-secret-2026")
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

PRIMARY_DATABASE = (
    os.environ.get("MYSQL_DATABASE")
    or os.environ.get("DB_NAME")
    or "esahyogi"
).strip()
DB_FALLBACK_DATABASES = tuple(
    database_name
    for database_name in ("esahyogi", "esahyogi_db")
    if database_name != PRIMARY_DATABASE
)

DB_CONFIG = {
    "host": os.environ.get("MYSQL_HOST", "127.0.0.1"),
    "port": int(os.environ.get("MYSQL_PORT", "3306") or 3306),
    "database": PRIMARY_DATABASE,
    "user": os.environ.get("MYSQL_USER", "root"),
    "password": os.environ.get("MYSQL_PASSWORD", "283114"),
}
