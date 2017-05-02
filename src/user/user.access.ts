import * as Bluebird    from 'bluebird';
import { Transaction }  from 'sequelize';
import { Instance }     from 'sequelize';
import { database }     from '../utils/orm';
import { Model }        from '../utils/orm';
import { User, Book }   from '../lib';
import { ID }           from '../lib';
import { sanitizeUser }           from '../utils/sanitizer';
import { sanitizeUserForInsert }  from '../utils/sanitizer';

/**
 * Returns sanitized user's information directly from database.
 * If no user exists with the given ID,
 * returns a promise rejection.
 * @param userId The user's ID.
 * @returns {Bluebird<User.Info>}
 */
export function getUserById(userId: ID): Bluebird<User.Info> {
  return Bluebird.resolve(Model.User
    .findById(userId))
    .then((user: Instance<any>) => {
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
 * Returns a sanitized version of the inserted user.
 * @param user The user's info to insert.
 * @returns {Bluebird<any>}
 */
export function addUser(user: User.Info): Bluebird<User.Info> {
  return Bluebird
    .resolve(database.transaction((t: Transaction) => {
      return Model.User
        .create(sanitizeUserForInsert(user), {
          transaction: t
        });
      }))
    .then((user: Instance<any>) => {
      return sanitizeUser(user.get({plain: true}));
    });
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
  return Bluebird
    .resolve(Model.User.findById(userId))
    .then((user: Instance<any>) => {
      return database.transaction((t: Transaction) => {
        return user
          .increment(['points'], {
            by: n,
            transaction: t
          });
      });
    })
    .then((user: Instance<any>) => {
      return sanitizeUser(user.get({plain: true}));
    });
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
  return Bluebird
    .resolve(Model.User.findById(userId))
    .then((user: Instance<any>) => {
      return database.transaction((t: Transaction) => {
        return user
          .increment(['score'], {
            by: n,
            transaction: t
          });
      });
    })
    .then((user: Instance<any>) => {
      return sanitizeUser(user.get({plain: true}));
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
        origin: userId
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
export function getUserBorrowedBooks(userId: ID): Bluebird<Book.Raw[]> {
  return Bluebird.resolve(Model.Borrow
    .findAll({
      where: {
        userId: userId,
        dateOfReturn: null
      },
      include: [Model.Book]
    }))
    .map((res: any) => {
      return res.get({plain: true}).book;
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
export function getUserReadingBooks(userId: ID): Bluebird<Book.Raw[]> {
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
    .map((res: any) => {
      return res.get({plain: true}).book;
    });
}

/**
 * Marks the given book a borrowed by the given user.
 * It also adds a transaction in the Borrow table,
 * and ensures that the table is still consistent
 * (by calling an internal procedure).
 * If there was an error (book unavailable or bad ID provided),
 * returns a promise rejection.
 * Otherwise, returns the created Borrow's ID.
 * @param userId The user's ID.
 * @param bookId The ID of the book to borrow.
 * @returns {Bluebird<ID>}
 */
export function borrowBook(userId: ID, bookId: ID): Bluebird<ID> {
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
      if(res && res[0] && res[0].res !== undefined) {
        // That's a success
        return res[0].res;
      }
      // There was a problem
      return Bluebird.reject(
        new Error('Unable to add a borrowing. The book may be unavailable, or bad IDs were provided.')
      );
    });
}