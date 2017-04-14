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

## Mocks services for sprint 1
### GET /user/:userID
```js
{
    userID: User.ID;
    username: string;
    lastName: string;
    firstName: string;
    points: number;
    score: number;
    signUpDate: Date;
}
```

### GET /user/books/:userID
```js
{
  userID: ID;
  booksID: Book.ID[];
}
```

### GET /book/:bookID
```js
{
   id: Book.ID;
   isbn: number;
   title: string;
   genres: string[];
   author: string;
}
```