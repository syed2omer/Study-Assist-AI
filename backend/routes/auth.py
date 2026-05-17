from fastapi import APIRouter
from utils.db import db
import bcrypt

router = APIRouter()

users = db["users"]

@router.post("/signup")
async def signup(data: dict):

    existing_user = users.find_one({"email": data["email"]})

    if existing_user:
        return {"message": "User already exists"}

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user_data = {
        "name": data["name"],
        "email": data["email"],
        "password": hashed_password
    }

    users.insert_one(user_data)

    return {"message": "User created successfully"}