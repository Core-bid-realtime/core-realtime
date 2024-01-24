# API DOCS

## List Of Available Endpoints

### 1. User

- `POST /register`
- `POST /login`

### 2. Product

- `GET /products`

## User Endpoints

### 1. POST /register

**Request**

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

##### Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

##### Response (400 - Bad Request)

```json
{
    "message": "Full Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
    "message": "Email must be unique"
}
OR
{
    "message": "Invalid email format"
}
```

### 2. POST /login

**Request**

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

##### Response (201 - Created)

```json
{
  "access_token": "string"
}
```

##### Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

##### Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## Product Endpoints

### 1. GET /products

**Request**

- Headers:

```json
{
    "access_token": "string"
}
```

##### Response (201 - Created)

```json
{
    "message": "Data berhasil diambil",
    "data": [
        {
            "id": 1,
            "name": "NEW BALANCE 2002R MEN'S SNEAKERS- GREY",
            "description": "Sneakers 2002R kami untuk pria membuktikan bahwa sepatu keren tetap bisa nyaman. Upper kulit/jaring terinspirasi dari sepatu lari tahun 2000-an untuk estetika retro yang modern yang memperkuat status Anda sebagai pengaruh gaya.",
            "imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEW0-NEWML2002R0-Grey.jpg",
            "currentBid": 1000000,
            "timeLimit": "2024-01-30 22:18:46.501 +0700",
            "sold": false,
            "UserId": 1
        },
        {
            "name": "NEW BALANCE 1906 MEN'S SNEAKERS SHOES - BLACK",
            "description": "Dengan sepatu sneakers pria 1906R, Anda mendapatkan gaya dan fungsi dalam satu paket yang tak tertandingi. Ini adalah referensi kembali ke pelari tahun 2000-an dengan sentuhan kenyamanan seperti midsole ABZORB dan teknologi Stability Web untuk dukungan lengkungan.",
            "imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEWA-NEWM1906RCH-Black.jpg",
            "currentBid": 1100000,
            "timeLimit": "2024-01-29 22:18:46.501 +0700",
            "sold": false,
            "UserId": 1
        },
        ...
    ]
}
```