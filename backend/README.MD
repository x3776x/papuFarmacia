# PRODUCT

## New Product interface

    idProductType: number;
    // Optional for non medicine products
    chemicalName?: string;
        comercialName: string;
    photoId: string;
    description: string;
    price: number;
    // Optional for non medicine products
        dateOut?: Date;
    // Remove this attribute and add the stock in another flow.
        newStock: number;
    batch: string;
    provider: string;
    // Optional for non medicine products
        pharmaceutical?: string; | pharmaceuticalId: number;

## Get Photo interface

    medicine_picture?: string;
    user_id: number;
    created_at: string;
    updated_at: string;

# USER

## Login interface

    identifier: string;
    password: string;

## New User interface

    email: string;
    full_name: string;
    username: string;
    password: string;

## Get Profile Photo interface

    profile_picture: string;
    user_id: number;
    created_at: string;
    updated_at: string;


# env vars to test it
#auth
POSTGRES_AUTH_USER=
POSTGRES_AUTH_PASSWORD=
POSTGRES_AUTH_DB=
POSTGRES_AUTH_HOST=
POSTGRES_AUTH_PORT=

#user
MONGO_USER_INITDB_ROOT_USERNAME=
MONGO_USER_INITDB_ROOT_PASSWORD=
MONGO_USER_DB=
MONGO_USER_HOST=
MONGO_USER_PORT=

#products
POSTGRES_PRODUCT_USER=
POSTGRES_PRODUCT_PASSWORD=
POSTGRES_PRODUCT_DB=
POSTGRES_PRODUCT_HOST=
POSTGRES_PRODUCT_PORT=

#sales
POSTGRES_SALES_USER=
POSTGRES_SALES_PASSWORD=
POSTGRES_SALES_DB=
POSTGRES_SALES_HOST=
POSTGRES_SALES_PORT=



#URLs
AUTH_SERVICE_URL=
USER_SERVICE_PROFILE_URL=
USER_SERVICE_PHOTO_URL=
DB_SALES_URL=

#JWT
SECRET_KEY=