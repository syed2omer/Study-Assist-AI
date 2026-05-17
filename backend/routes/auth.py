from fastapi import APIRouter
from utils.db import db
from dotenv import load_dotenv
import bcrypt
import jwt
import os

load_dotenv()

router = APIRouter()

users = db["users"]

JWT_SECRET = os.getenv("JWT_SECRET")


@router.post("/signup")
async def signup(data: dict):

    existing_user = users.find_one({"email": data["email"]})

    if existing_user:
        return {"message": "User already exists"}

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    user_data = {
        "name": data["name"],
        "email": data["email"],
        "password": hashed_password
    }

    users.insert_one(user_data)

    return {"message": "User created successfully"}


@router.post("/login")
async def login(data: dict):

    user = users.find_one({"email": data["email"]})

    if not user:
        return {"message": "User not found"}

    password_match = bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user["password"].encode("utf-8")
    )

    if not password_match:
        return {"message": "Invalid password"}

    token = jwt.encode(
        {
            "email": user["email"]
        },
        JWT_SECRET,
        algorithm="HS256"
    )

    return {
        "message": "Login successful",
        "token": token
    }