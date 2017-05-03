import * as Bluebird  from 'bluebird';
import * as services  from './user.access';
import { User, Book } from '../lib';
import { ID }         from '../lib';

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
        books: []
      };
      console.log(books.length);
      for(let b of books) {
        lib.books.push({
          bookId: b.bookId,
          isbn: b.isbn ? b.isbn : +b.bookId + Book.META_ISBN
        });
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
        books: []
      };
      for(let b of books) {
        lib.books.push({
          bookId: b.bookId,
          isbn: b.isbn ? b.isbn : +b.bookId + Book.META_ISBN
        });
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
        books: []
      };
      for(let b of books) {
        lib.books.push({
          bookId: b.bookId,
          isbn: b.isbn ? b.isbn : +b.bookId + Book.META_ISBN
        });
      }
      return lib;
    });
}

/**
 * Returns all user's information that can be safely
 * broadcast. I.e. some data such has the hashed password
 * won't be sent here.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Info>}
 */
export function getUserInfo(userId: ID): Bluebird<User.Info> {
  return services.getUserById(userId);
}

/**
 * Returns all user's information about the current user that can be safely
 * broadcast. I.e. some data such has the hashed password
 * won't be sent here.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Info>}
 */
export function getCurrentUser(userId: ID): Bluebird<User.Info> {
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

/**
 * Increments the points of the given user by n.
 * Note: the points must NOT be null, or nothing will happen.
 * Returns a sanitized version of the user BEFORE the update.
 * @param userId The user to which add points.
 * @param n The number of points to add.
 * @returns {Bluebird<User.Info>}
 */
export function addPoints(userId: ID, n: number): Bluebird<User.Info> {
  return services.addPoints(userId, n);
}

/**
 * Increments the score of the given user by n.
 * Note: the score must NOT be null, or nothing will happen.
 * Returns a sanitized version of the user BEFORE the update.
 * @param userId The user to which increase score.
 * @param n The number to increase the score by.
 * @returns {Bluebird<User.Info>}
 */
export function addScore(userId: ID, n: number): Bluebird<User.Info> {
  return services.addScore(userId, n);
}

/**
 * Borrows the book for the given user.
 * Upon success, returns the ID of the created Borrow object.
 * @param userId The user to which add points.
 * @param bookId The number of points to add.
 * @returns {Bluebird<ID>}
 */
export function borrowBook(userId: ID, bookId: ID): Bluebird<ID> {
  return services
    .borrowBook(userId, bookId);
}

// export function updatePassword(userId: ID, oldPass: string, pass: string): Bluebird<any> {
//   return services.updatePassword(pass);
// }

/**
 * Borrows the book for the given user.
 * Upon success, returns the ID of the created Borrow object.
 * @param isbn the isbn of the book
 * @returns {Bluebird<any[]>}
 */
export function getCurrentOwners(isbn: string): Bluebird<any[]> {
  return services
    .getCurrentOwners(isbn);
}

