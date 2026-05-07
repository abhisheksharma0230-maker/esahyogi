# eSahyogi MySQL Setup

This project now uses a Python Flask backend with MySQL.

## 1. Create the database

Import [`api/sql/esahyogi.sql`](./sql/esahyogi.sql) into MySQL.

## 2. Configure database credentials

Edit [`backend_config.py`](../backend_config.py):

- `host`
- `port`
- `database`
- `user`
- `password`

Default values assume local MySQL:

- host: `127.0.0.1`
- port: `3306`
- database: `esahyogi_db`
- user: `root`
- password: blank

## 3. Install Python packages

```bash
pip install -r requirements.txt
```

## 4. Run the server

```bash
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

## 5. What works

- complaint submission to MySQL
- complaint tracking by tracking ID
- stats counters from MySQL
- optional image/audio/video upload storage in `uploads/`

## Notes

- The frontend is wired to `/api/complaints/` and `/api/stats/`.
- The duplicate legacy localStorage submit function in `index.html` was renamed so the Flask API flow stays active.
