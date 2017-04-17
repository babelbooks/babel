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

#### PUT /user/add
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
   "metaDataId": ID,
   "isbn": number,
   "title": string,
   "genres": string[],
   "author": string,
   "edition": string,
   "majorForm": string,
   "cover": string
}
```

#### GET /available
```json
[{
   "bookId": ID,
   "metaDataId": ID,
   "userId": ID,
   "available": boolean
}]
```

#### PUT /book/add
The provided book must have the following shape:
```json
{
  "userId" : ID,
  "metaDataId": ID
}
```

OR:
```json
{
  "userId" : ID,
  "metaData": {
    "isbn": number,
    "title": string,
    "genres": string[],
    "author": string,
    "edition": string,
    "majorForm": string,
    "cover": string
  }
}
```
Other meaningful fields will be erased.
Other fields will cause an error.

Please note that the second form will try to create metadata as well.

#### POST /read
The provided object must have the following shape:

```json
{
  "bookId" : ID
}
```