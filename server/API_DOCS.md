<!-- @format -->

# API DOCS

## List Of Available Endpoints

### 1. User

- `POST /register`
- `POST /login`

### 2. Product

- `GET /products`
- `POST /products`
- `DELETE /products/:productId`
- `GET /product/:productId`
- `GET /list`
- `POST /products/:productId`

### 3. Bid

- `POST /bid`
- `GET /bid/:productId`
- `GET /user/products`
- `GET /user/me`
- `GET /product/timelimit/:productId`
- `GET /bid/:productId`

---

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

---

## Product Endpoints

### 1. GET /products

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

##### Response (200 - OK)

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

### 2. POST /products

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

- Body:

```json
{
	"name": "NEW BALANCE 2002R MEN'S SNEAKERS- GREY",
	"description": "Sneakers 2002R kami untuk pria membuktikan bahwa sepatu keren tetap bisa nyaman. Upper kulit/jaring terinspirasi dari sepatu lari tahun 2000-an untuk estetika retro yang modern yang memperkuat status Anda sebagai pengaruh gaya.",
	"imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEW0-NEWML2002R0-Grey.jpg",
	"currentBid": 1000000,
	"timeLimit": "2024-01-30 22:18:46.501 +0700"
}
```

##### Response (201 - Created)

```json
{
	"id": 1,
	"name": "NEW BALANCE 2002R MEN'S SNEAKERS- GREY",
	"description": "Sneakers 2002R kami untuk pria membuktikan bahwa sepatu keren tetap bisa nyaman. Upper kulit/jaring terinspirasi dari sepatu lari tahun 2000-an untuk estetika retro yang modern yang memperkuat status Anda sebagai pengaruh gaya.",
	"imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEW0-NEWML2002R0-Grey.jpg",
	"currentBid": 1000000,
	"timeLimit": "2024-01-30 22:18:46.501 +0700",
	"sold": false,
	"UserId": 1
}
```

### 3. DELETE /products/:productId

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

- Params:

```json
{
	"id": integer
}
```

##### Response (200 - OK)

```json
{
	"message": "Successfully Deleted Product"
}
```

##### Response (400 - Bad Request)

```json
{
	"message": "Invalid product ID"
}
```

##### Response (404 - Not Found)

```json
{
	"message": "Product not found"
}
```

### 4. GET /product/:productId

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

- Params:

```json
{
	"id": integer
}
```

##### Response (200 - OK)

```json
{
  "id": 1,
  "name": "NEW BALANCE 2002R MEN'S SNEAKERS- GREY",
  "description": "Sneakers 2002R kami untuk pria membuktikan bahwa sepatu keren tetap bisa nyaman. Upper kulit/jaring terinspirasi dari sepatu lari tahun 2000-an untuk estetika retro yang modern yang memperkuat status Anda sebagai pengaruh gaya.",
  "imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEW0-NEWML2002R0-Grey.jpg",
  "currentBid": 1000000,
  "timeLimit": "2024-01-30 22:18:46.501 +0700",
  "sold": false,
  "UserId": 1,
  "createdAt": "2023-12-19T12:58:34.538Z",
  "updatedAt": "2023-12-19T12:58:34.538Z",
  "User": {
      "id": 1,
      "fullname": "user1",
      "email": "user1@mail.com",
      "createdAt": "2023-12-19T12:58:32.528Z",
      "updatedAt": "2023-12-19T12:58:32.528Z"
  }
        },
```

##### Response (400 - Bad Request)

```json
{
	"message": "Invalid product ID"
}
```

##### Response (404 - Not Found)

```json
{
	"message": "Product not found"
}
```

### 5. GET /list/:userId

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

- Params:

```json
{
	"id": integer
}
```

##### Response (200 - OK)

```json
[
	{
		"UserId": 1,
		"id": 1,
		"name": "NEW BALANCE 2002R MEN'S SNEAKERS- GREY",
		"description": "Sneakers 2002R kami untuk pria membuktikan bahwa sepatu keren tetap bisa nyaman. Upper kulit/jaring terinspirasi dari sepatu lari tahun 2000-an untuk estetika retro yang modern yang memperkuat status Anda sebagai pengaruh gaya.",
		"imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEW0-NEWML2002R0-Grey.jpg",
		"currentBid": 1000000,
		"timeLimit": "2024-01-30 22:18:46.501 +0700",
		"sold": false,
		"createdAt": "2023-12-19T12:58:32.538Z",
		"updatedAt": "2023-12-19T12:58:32.538Z"
	},
	{
		"userId": 2,
		"id": 2,
		"name": "NEW BALANCE 1906 MEN'S SNEAKERS SHOES - BLACK",
		"description": "Dengan sepatu sneakers pria 1906R, Anda mendapatkan gaya dan fungsi dalam satu paket yang tak tertandingi. Ini adalah referensi kembali ke pelari tahun 2000-an dengan sentuhan kenyamanan seperti midsole ABZORB dan teknologi Stability Web untuk dukungan lengkungan.",
		"imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEWA-NEWM1906RCH-Black.jpg",
		"currentBid": 1100000,
		"timeLimit": "2024-01-29 22:18:46.501 +0700",
		"sold": false,
		"createdAt": "2023-12-19T12:58:34.538Z",
		"updatedAt": "2023-12-19T12:58:34.538Z"
	}
]
```

##### Response (400 - Bad Request)

```json
{
	"message": "Invalid product ID"
}
```

##### Response (404 - Not Found)

```json
{
	"message": "Product not found"
}
```

### 6. POST /products/:productId

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

- Params:

```json
{
	"id": integer
}
```

##### Response (200 - OK)

```json
[
	{
		"id": 1,
		"bidAmount": 1100000,
		"UserId": 1,
		"ProductId": 1,
		"createdAt": "2023-12-19T13:09:30.061Z",
		"updatedAt": "2023-12-19T13:09:30.061Z",
		"User": {
			"id": 1,
			"fullname": "user1",
			"email": "user1@mail.com",
			"createdAt": "2023-12-19T12:58:15.823Z",
			"updatedAt": "2023-12-19T12:58:15.823Z"
		}
	}
]
```

##### Response (400 - Bad Request)

```json
{
	"message": "Invalid product ID"
}
```

##### Response (404 - Not Found)

```json
{
	"message": "Product not found"
}
```

---

## Bid Endpoints

### 1. POST /bid

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
	"id": 2,
	"name": "NEW BALANCE 1906 MEN'S SNEAKERS SHOES - BLACK",
	"description": "Dengan sepatu sneakers pria 1906R, Anda mendapatkan gaya dan fungsi dalam satu paket yang tak tertandingi. Ini adalah referensi kembali ke pelari tahun 2000-an dengan sentuhan kenyamanan seperti midsole ABZORB dan teknologi Stability Web untuk dukungan lengkungan.",
	"imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEWA-NEWM1906RCH-Black.jpg",
	"currentBid": 1100000,
	"timeLimit": "2024-01-29 22:18:46.501 +0700",
	"sold": true,
	"UserId": 1,
	"createdAt": "2023-12-19T12:58:32.538Z",
	"updatedAt": "2023-12-19T12:58:32.538Z"
}
```

### 2. POST /bid/:productId

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

- Params:

```json
{
	"id": integer
}
```

##### Response (201 - Created)

```json
{
	"id": 2,
	"UserId": 1,
	"ProductId": 1,
	"bidAmount": 1100000,
	"createdAt": "2023-12-19T13:09:30.061Z",
	"updatedAt": "2023-12-19T13:09:30.061Z"
}
```

##### Response (400 - Bad Request)

```json
{
	"message": "Input your amount!"
}
```

### 3. GET /user/products

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

##### Response (200 - OK)

```json
{
 [
  {
    "id" : 1,
    "orderId": "ORD-CORE-71717117398388",
    "name": "NEW BALANCE 1906 MEN'S SNEAKERS SHOES - BLACK",
    "description": "Dengan sepatu sneakers pria 1906R, Anda mendapatkan gaya dan fungsi dalam satu paket yang tak tertandingi. Ini adalah referensi kembali ke pelari tahun 2000-an dengan sentuhan kenyamanan seperti midsole ABZORB dan teknologi Stability Web untuk dukungan lengkungan.",
	  "imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEWA-NEWM1906RCH-Black.jpg",
    "amount": 1100000,
    "status": "paid",
    "UserId" : 1,
    "createdAt": "2023-12-19T13:09:30.061Z",
    "updatedAt": "2023-12-19T13:09:30.061Z",
  },
  {
    "id" : 2,
    "orderId": "ORD-CORE-86216618894849",
    "name": "NEW BALANCE 2002R MEN'S SNEAKERS- GREY",
    "description": "Sneakers 2002R kami untuk pria membuktikan bahwa sepatu keren tetap bisa nyaman. Upper kulit/jaring terinspirasi dari sepatu lari tahun 2000-an untuk estetika retro yang modern yang memperkuat status Anda sebagai pengaruh gaya.",
    "imageUrl": "https://www.footlocker.id/media/catalog/product/cache/e81e4f913a1cad058ef66fea8e95c839/0/1/01-NEW-BALANCE-FFSSBNEW0-NEWML2002R0-Grey.jpg",
    "amount": 1000000,
    "status": "paid",
    "UserId" : 2,
    "createdAt": "2023-12-19T12:58:33.528Z",
    "updatedAt": "2023-12-19T12:58:33.528Z",
  },
  ...,
 ]
}
```

### 4. GET /user/me

**Request**

- Headers:

```json
{
	"access_token": "string"
}
```

##### Response (200 - OK)

```json
{
	"id": 1,
	"bidAmount": 1100000,
	"orderId": "ORD-CORE-71717117398388",
	"createdAt": "2023-12-19T12:58:33.528Z",
	"updatedAt": "2023-12-19T12:58:33.528Z"
}
```

##### Response (404 - Not Found)

```json
{
    "message": "Product not found"
}
OR
{
    "message": "Not Found!"
}
```

### 5. GET /product/timelimit/:productId

Request

- headers:

```json
{
	"access_token": "string"
}
```

Response (200 - OK)

```json
{
	"id": 2,
	"bidAmount": 1100000,
	"orderId": "ORD-CORE-71717117398388",
	"createdAt": "2023-12-19T12:58:33.528Z",
	"updatedAt": "2023-12-19T12:58:33.528Z"
}
```

Response (404 - Not Found)

```json
{
	"message": "Product not found"
}
```

---

### Global Error

Response (401 - invalidToken)

```json
{
	"message": "Invalid token"
}
```

Response (500 - Internal Server Error)

```json
{
	"message": "Internal server error"
}
```
