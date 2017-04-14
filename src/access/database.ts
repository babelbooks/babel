import * as Bluebird  from 'bluebird';
import { Model }      from './orm';
import * as User      from '../lib/user/user.interfaces';
import * as Book      from '../lib/book/book.interfaces';

function sanitizeUser(user: any): any {
  delete user.password;
  return user;
}

export function getUserById(userId: User.ID): Bluebird<User.Info> {
  return Bluebird.resolve(Model.User
    .findById(userId))
    .then((user: any) => {
      return sanitizeUser(Object.assign(user.dataValues));
    });
}

export function getUserBooks(userID: User.ID): Bluebird<User.Books> {
  return Bluebird.resolve(Model.Book
    .findAll({
      where: {
        userID: userID
      }
    }))
    .then((books: any[]) => {
      let lib: User.Books = {
        userID: userID,
        booksID: []
      };
      for(let b of books) {
        lib.booksID.push(b.dataValues.bookId);
      }
      return lib;
    });
}

export function getBookById(bookID: Book.ID): Bluebird<Book.Info> {
  return Bluebird.resolve(Model.Book
    .findById(bookID))
    .then((book: any) => {
      return Object.assign(book.dataValues);
    });
}