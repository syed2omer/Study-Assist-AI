from fastapi import APIRouter, UploadFile, File
from pypdf import PdfReader
import shutil
import os
import utils.store as store

router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    try:

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        reader = PdfReader(file_path)

        extracted_text = ""

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                extracted_text += page_text

        store.stored_notes = extracted_text[:3000]

        return {
            "filename": file.filename,
            "text": extracted_text[:3000]
        }

    except Exception as e:

        return {
            "error": str(e)
        }