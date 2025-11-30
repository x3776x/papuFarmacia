import shutil
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app import schemas, crud
from app.database import get_db

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=schemas.Product)
async def create_product(
    product: schemas.ProductCreate,
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db)
):
    image_path = None
    if image:
        image_path = f"images/{image.filename}"
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

    return crud.create_product(db, product, image_path)


@router.get("/", response_model=list[schemas.Product])
def list_products(db: Session = Depends(get_db)):
    return crud.get_products(db)


@router.get("/{product_id}", response_model=schemas.Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return crud.get_product(db, product_id)

@app.get("/health")
def health_check():
    return {"status": "ok"}