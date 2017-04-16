import * as Bluebird    from 'bluebird';
import { Transaction }  from 'sequelize';
import { database }     from './orm';
import { Model }        from './orm';
import { User, Book }   from '../lib';
import { ID }           from '../lib';
import { sanitizeUser }           from './sanitizer';
import { sanitizeUserForInsert }  from './sanitizer';

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
 * Adds an user to the database.
 * Before doing so, removes and reset some fields to default values
 * (id, score, point, sign-up date), and check for unique username.
 * If there was a problem with the insert, return a promise rejection.
 * @param user The user's info to insert.
 * @returns {Bluebird<any>}
 */
export function addUser(user: User.Info): Bluebird<any> {
  return Bluebird
    .resolve(Model.User.findAll({
      where : {
        username: user.username
      }
    }))
    .then((users: any[]) => {
      if(users.length == 0) {
        return database.transaction((t: Transaction) => {
          return Model.User
            .create(sanitizeUserForInsert(user), {
              transaction: t
            });
          });
      }
      // Oops, this username already exists !
      return Bluebird.reject(new Error('An User with the given username already exists.'));
    });
}

/**
 * Returns a list of all books' IDs owned by the given user.
 * If the given user doesn't exists or owns no book,
 * returns an empty array in booksID.
 * @param userId The user's ID.
 * @returns {Bluebird<Book.Raw[]>}
 */
export function getUserBooks(userId: ID): Bluebird<Book.Raw[]> {
  return Bluebird.resolve(Model.Book
    .findAll({
      where: {
        userId: userId
      }
    }))
    .map((book: any) => {
      return book.get({plain: true});
    });
}

/**
 * Returns all books of the given user that are
 * currently borrowed by the given user.
 * If the given user doesn't exists or owns no book,
 * returns an empty array in booksID.
 * @param userId The user's ID.
 * @returns {Bluebird<any[]>}
 */
export function getUserBorrowedBooks(userId: ID): Bluebird<any[]> {
  return Bluebird.resolve(Model.Borrow
    .findAll({
      where: {
        userId: userId,
        dateOfReturn: null
      }
    }))
    .map((book: any) => {
      return book.get({plain: true});
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
    .resolve(database.transaction((t: Transaction) => {
      return database.query(
        'select newBorrowing(:userId, :bookId) as res',
        {
          replacements: {
            userId: userId,
            bookId: bookId
          },
          type: database.QueryTypes.SELECT,
          transaction: t
        });
    }))
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