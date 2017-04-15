import * as Bluebird    from 'bluebird';
import { database }     from './orm';
import { Model }        from './orm';
import { User }         from '../lib';
import { ID }           from '../lib';
import { sanitizeUser } from './sanitizer';

/**
 * Returns sanitized user's information directly from database.
 * If no user exists with the given ID,
 * returns a promise rejection.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Metadata>}
 */
export function getUserById(userId: ID): Bluebird<User.Info> {
  return Bluebird.resolve(Model.User
    .findById(userId))
    .then((user: any) => {
      if(!user) {
        return Bluebird.reject(new Error('No User found with ID: ' + userId));
      }
      return sanitizeUser(user.get({plain: true}));
    });
}

/**
 * Returns a list of all books' IDs owned by the given user.
 * If the given user doesn't exists or owns no book,
 * returns an empty array in booksID.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Books>}
 */
export function getUserBooks(userId: ID): Bluebird<User.Books> {
  return Bluebird.resolve(Model.Book
    .findAll({
      where: {
        userId: userId
      }
    }))
    .then((books: any[]) => {
      let lib: User.Books = {
        userId: userId,
        booksId: []
      };
      for(let b of books) {
        lib.booksId.push(b.get({plain: true}).bookId);
      }
      return lib;
    });
}

/**
 * Returns all books of the given user that are
 * currently borrowed by the given user.
 * If the given user doesn't exists or owns no book,
 * returns an empty array in booksID.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Books>}
 */
export function getUserBorrowedBooks(userId: ID): Bluebird<User.Books> {
  return Bluebird.resolve(Model.Borrow
    .findAll({
      where: {
        userId: userId,
        dateOfReturn: null
      }
    }))
    .then((books: any[]) => {
      let lib: User.Books = {
        userId: userId,
        booksId: []
      };
      for(let b of books) {
        lib.booksId.push(b.get({plain: true}).bookId);
      }
      return lib;
    });
}

/**
 * Returns the list of all books that the given user
 * is currently reading.
 * If the given user doesn't exists or is not currently reading
 * any book, returns an empty array in booksID.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Books>}
 */
export function getUserReadingBooks(userId: ID): Bluebird<User.Books> {
  return Bluebird.resolve(Model.Borrow
    .findAll({
      where: {
        userId: userId,
        dateOfReturn: null
      },
      include: [{
        model: Model.Book,
        where: {
          available: false
        }
      }]
    }))
    .then((books: any[]) => {
      let lib: User.Books = {
        userId: userId,
        booksId: []
      };
      for(let b of books) {
        lib.booksId.push(b.dataValues.bookId);
      }
      return lib;
    });
}

/**
 * Marks the given book a borrowed by the given user.
 * It also adds a transaction in the Borrow table,
 * and ensures that the table is still consistent
 * (by calling an internal procedure).
 * If there was an error (book unavailable or bad ID provided),
 * returns a promise rejection.
 * @param userId The user's ID.
 * @param bookId The ID of the book to borrow.
 * @returns {Bluebird<boolean>}
 */
export function borrowBook(userId: ID, bookId: ID): Bluebird<void> {
  return Bluebird
    .resolve(database.query(
      'select newBorrowing(:userId, :bookId) as res',
      {
        replacements: {
          userId: userId,
          bookId: bookId
        },
        type: database.QueryTypes.SELECT
      })
    )
    .then((res: any[]) => {
      if(res && res[0] && res[0].res == 1) {
        // That's a success
        return;
      }
      // There was a problem
      return Bluebird.reject(
        new Error('Unable to add a borrowing. The book may be unavailable, or bad IDs were provided.')
      );
    });
}