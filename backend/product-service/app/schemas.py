from pydantic import BaseModel
from datetime import date

class ProductBase(BaseModel):
    tipo: str
    nombre_quimico: str | None = None
    nombre_comercial: str
    descripcion: str | None = None
    precio: float
    fecha_caducidad: date | None = None
    stock: int
    lote: str
    proveedor: str
    farmaceutica: str | None = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    imagen: str | None = None

    class Config:
        orm_mode = True
