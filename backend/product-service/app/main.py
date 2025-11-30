from fastapi import FastAPI
from app.routers import router
from app.models import Base
from app.database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Pharmacy Products Service")
app.include_router(router)
