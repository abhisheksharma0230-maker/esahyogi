from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parent
UPLOADS_DIR = ROOT_DIR / "uploads"
MAX_FILE_SIZE = 10 * 1024 * 1024
SECRET_KEY = "esahyogi-admin-secret-2026"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

DB_CONFIG = {
    "host": "127.0.0.1",
    "port": 3306,
    "database": "esahyogi_db",
    "user": "root",
    "password": "283114",
}
