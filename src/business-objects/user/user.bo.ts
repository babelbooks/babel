import * as Bluebird  from 'bluebird';
import * as services  from '../../access/user.access';
import { User, Book } from '../../lib';
import { ID }         from '../../lib';

/**
 * Gather the list of all books originally owned by the given user
 * (identified by the given ID).
 * If the user hasn't any books yet, returns an object
 * with an empty array.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Books>}
 */
export function getUserLibrary(userId: ID): Bluebird<User.Books> {
  return services
    .getUserBooks(userId)
    .then((books: Book.Raw[]) => {
      let lib: User.Books = {
        username: userId,
        booksId: []
      };
      console.log(books.length);
      for(let b of books) {
        lib.booksId.push(b.bookId);
      }
      return lib;
    });
}

/**
 * Gather the list of all books borrowed by the given user
 * (identified by the given ID).
 * If the user hasn't borrowed books yet, returns an object
 * with an empty array.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Books>}
 */
export function getUserBorrowedBooks(userId: ID): Bluebird<User.Books> {
  return services
    .getUserBorrowedBooks(userId)
    .then((books: Book.Raw[]) => {
      let lib: User.Books = {
        username: userId,
        booksId: []
      };
      for(let b of books) {
        lib.booksId.push(b.bookId);
      }
      return lib;
    });
}

/**
 * Gather the list of all books currently read by the given user
 * (identified by the given ID).
 * If the user isn't reading books for now, returns an object
 * with an empty array.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Books>}
 */
export function getUserReadingBooks(userId: ID): Bluebird<User.Books> {
  return services
    .getUserReadingBooks(userId)
    .then((books: Book.Raw[]) => {
      let lib: User.Books = {
        username: userId,
        booksId: []
      };
      for(let b of books) {
        lib.booksId.push(b.bookId);
      }
      return lib;
    });
}

/**
 * Returns all user's information that can be safely
 * broadcast. I.e. some data such has the hashed password
 * won't be sent here.
 * @param userId
 * @returns {Bluebird<any>}
 */
export function getUserInfo(userId: ID): Bluebird<User.Info> {
  return services.getUserById(userId);
}

/**
 * Adds an user to Babelbooks.
 * If there was a problem with the request,
 * i.e. an user already exist with the given username,
 * returns a promise rejection.
 * @param user The user's info to add.
 * @returns {Bluebird<any>}
 */
export function addUser(user: User.Info): Bluebird<any> {
  return services.addUser(user);
}