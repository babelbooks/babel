# Babelbooks - Babel

## Build and run
First time or newly added package(s) from pull ?
```shell
npm install
```

Then, or every other times:
```shell
npm start
```

Only build:
```shell
gulp build
```

## Deploy
```shell
docker-compose up --build
```
And it will run the server + the database.

## Services
### Auth
#### POST /auth/login
The provided user must have the following shape:
```json
{
  "username": ID,
  "password": string
}
```

If successful, the result will be a `200 Success` header
along with a small JSON object.

Please note that client-side encryption is useless: just send it plain.
The best way is to use TLS (through HTTPS).

#### POST /auth/logout
Logs the current user out and remove associated session.

If successful, the result will be a `200 Success` header
along with a small JSON object.

### User
#### GET /user/me
**Protected**.
```json
{
    "username": string,
    "lastName": string,
    "firstName": string,
    "points": number,
    "score": number,
    "signUpDate": Date
}
```

#### GET /user/other/:userId
**Protected**.
```json
{
    "username": ID,
    "lastName": string,
    "firstName": string,
    "points": number,
    "score": number,
    "signUpDate": Date
}
```

#### GET /user/:userId/books
**Protected**.
```json
{
  "userId": ID,
  "books": {
    bookId: ID,
    isbn: ID
  }[]
}
```

#### GET /user/:userId/books/borrowed
**Protected**.
```json
{
  "userId": ID,
  "books": {
    bookId: ID,
    isbn: ID
  }[]
}
```

#### GET /user/:userId/books/reading
**Protected**.
```json
{
  "userId": ID,
  "books": {
    bookId: ID,
    isbn: ID
  }[]
}
```

#### POST /user/me/score
**Protected**.

Increments the current user's score by n.
The provided user must have the following shape:
```json
{
  "n" : number
}
```

If successful, the result will be a `200 Success` header with
the user BEFORE update as body.

#### POST /user/me/points
**Protected**.

Increments/decrements the current user's amount of points by n.
The provided user must have the following shape:
```json
{
  "n" : number
}
```

If successful, the result will be a `200 Success` header with
the user BEFORE update as body.

#### PUT /user/add
The provided user must have the following shape:
```json
{
  "user" : {
    "username": ID,
    "password": string,
    "lastName": string,
    "firstName": string
  }
}
```
Other meaningful fields will be erased.
Other fields or missing fields will cause an error.

If successful, the result will be a `201 Created` header with
the created user as body.

### Book
#### GET /book/:bookId
**Protected**.
```json
{
   "bookId": ID,
   "isbn": ID,
   "origin": ID,
   "available": boolean
}
```

#### GET book/all/available/:limit?/:offset?
**Protected**.
```json
[{
   "bookId": ID,
   "isbn": ID,
   "origin": ID,
   "available": boolean
}]
```

#### PUT /book/add
**Protected**.

The provided book must have the following shape:
```json
{
  "book": {
    "origin" : ID,
    "isbn": ID | null,
    "available": boolean
  }
}
```

Other meaningful fields will be erased.
Other fields will cause an error.

If successful, the result will be a `201 Created` header with
the created book as body.

#### POST /read
**Protected**.

Sets the given book as read.
The provided object must have the following shape:

```json
{
  "bookId" : ID
}
```

If successful, the result will be a `200 Success` header with
the book BEFORE update as body.
