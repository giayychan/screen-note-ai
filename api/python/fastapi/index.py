from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import ai_dictionary, ai_article
from dotenv import load_dotenv
import os

load_dotenv()
site_url = os.getenv("NEXT_PUBLIC_SITE_URL")
allowed_origins = [site_url]


app = FastAPI(root_path="/api/python/fastapi")


@app.get("/healthchecker")
def healthchecker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_dictionary.router)
app.include_router(ai_article.router)
