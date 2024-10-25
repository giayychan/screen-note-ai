from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import ai_dictionary

root_path = "/api/python/fastapi"

app = FastAPI(root_path=root_path, docs_url="/docs",
              openapi_url="/openapi.json")


@app.get("/healthchecker")
def healthchecker():
    return {"status": "success", "message": "Integrate FastAPI Framework with Next.js"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_dictionary.router)
