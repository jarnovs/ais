from pathlib import Path

CHUNKS_SIZE = 4 * 1024 * 1024

ALLOWED_FILE_EXTENSIONS = {".zip"}

UPLOAD_DIR = Path("eaip")
UPLOAD_DIR.mkdir(exist_ok=True)
