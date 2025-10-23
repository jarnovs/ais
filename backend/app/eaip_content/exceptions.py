from fastapi import APIRouter, HTTPException


ISSUE_NOT_FOUND = HTTPException(status_code=404, detail="Issue не найден")
DESCRIPTION_NOT_FOUND = HTTPException(status_code=404, detail="⚠️ Не найден заголовок 'Description'.")
P_TAG_NOT_FOUND = HTTPException(status_code=404, detail="⚠️ Не найден нужный тег <p> после Description.")