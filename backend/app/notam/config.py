from pathlib import Path

CHUNKS_SIZE = 64 * 1024
FILENAME_LIMIT = 63

ALLOWED_FILE_EXTENSIONS = {".json", ".jpg", ".png", ".svg", ".mp4", ".jpeg", ".heic", ".webp", ".pdf", ".html"}

UPLOAD_DIR = Path("notam")
UPLOAD_DIR.mkdir(exist_ok=True)
