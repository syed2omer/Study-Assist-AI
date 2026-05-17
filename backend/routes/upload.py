from fastapi import APIRouter, UploadFile, File
from pypdf import PdfReader
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    reader = PdfReader(file_path)

    extracted_text = ""

    for page in reader.pages:
        extracted_text += page.extract_text()

    return {
        "filename": file.filename,
        "text": extracted_text[:3000]
    }