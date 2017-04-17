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

## Services
### User
#### GET /user/:userId
```json
{
    "userId": ID,
    "username": string,
    "lastName": string,
    "firstName": string,
    "points": number,
    "score": number,
    "signUpDate": Date
}
```

#### GET /user/:userId/books
```json
{
  "userId": ID,
  "booksId": ID[]
}
```

#### GET /user/:userId/books/borrowed
```json
{
  "userId": ID,
  "booksId": ID[]
}
```

#### GET /user/:userId/books/reading
```json
{
  "userId": ID,
  "booksId": ID[]
}
```

#### PUT /user
The provided user must have the following shape:
```json
{
  "user" : {
    "username": string,
    "lastName": string,
    "firstName": string
  }
}
```
Other meaningful fields will be erased.
Other fields will cause an error.

If successful, the result will be a `201 Created` header.

### Book
#### GET /book/:bookId
```json
{
   "bookId": ID,
   "isbn": number,
   "title": string,
   "genres": string[],
   "author": string
}
```