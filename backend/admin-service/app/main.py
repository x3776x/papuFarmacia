from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import router

app = FastAPI(
    title="Admin service",
    description="Handles administrative tasks and user management",
    version="1.0.0",
    docs_url="/docs",
<<<<<<< HEAD
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    # TODO Cors
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
=======
    openapi_url="/openapi.json",
    root_path="/api/admin"
)


>>>>>>> Rodolfo

app.include_router(router)