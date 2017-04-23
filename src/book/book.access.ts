import * as Bluebird    from 'bluebird';
import { Transaction }  from 'sequelize';
import { Instance }     from 'sequelize';
import { Model }        from '../utils/orm';
import { database }     from '../utils/orm';
import { Book }         from '../lib';
import { ID }           from '../lib';
import { sanitizeBookForInsert }  from '../utils/sanitizer';

/**
 * Returns the raw book identified by the given ID.
 * If no book exists with such an ID,
 * returns a promise rejection.
 * @param bookId The book's ID.
 * @returns {Bluebird<Book.Raw>}
 */
export function getBookById(bookId: ID): Bluebird<Book.Raw> {
  return Bluebird.resolve(Model.Book
    .findById(bookId))
    .then((book: Instance<any>) => {
      if(!book) {
        return Bluebird.reject(new Error('No Book found with the ID: ' + bookId));
      }
      return book.get({plain: true});
    });
}

/**
 * Returns the list of all available books
 * in the database. The default limit is 10 and
 * the default offset is 0.
 * If no book is available, returns an empty array.
 * @returns {Bluebird<Book.Raw[]>}
 */
export function getAllAvailableBooks(limit: number = 10, offset: number = 0): Bluebird<Book.Raw[]> {
  return Bluebird.resolve(Model.Book
    .findAll({
      where: {
        available: true
      },
      limit: limit,
      offset: offset
    }))
    .map((book: Instance<any>) => {
      return book.get({plain: true});
    });
}

/**
 * Adds the given book to the database.
 * It also removes the book's ID if provided with the object.
 * If something went wrong somewhere (i.e. the provided user ID
 * doesn't match any known user, or something similar),
 * returns a promise rejection.
 * @param bookData The basic information about the book to insert.
 * @returns {Bluebird<Book.Raw>}
 */
export function addBook(bookData: Book.Raw): Bluebird<Book.Raw> {
  return Bluebird.resolve(database.transaction((t: Transaction) => {
    return Model.Book
      .create(sanitizeBookForInsert(bookData), {
        transaction: t
      });
    }))
    .then((book: Instance<any>) => {
      console.log(book.get({plain: true}));
      let b = book.get({plain: true});
      if(!b.isbn) {
        // We must add our meta ISBN number to ensure we will be able to
        // retrieve its metadata later on.
        return database.transaction((t: Transaction) => {
          return book.updateAttributes({
            isbn: b.bookId + Book.META_ISBN
          }, {
            transaction: t
          });
        });
      }
      return b;
    });
}

/**
 * Sets the given book as available.
 * If the book was already available, does nothing.
 * TODO: is this enough ?
 * TODO: only allows it if the book is possessed by the current user.
 * @param bookId The book's ID.
 * @returns {Bluebird<Book.Raw>}
 */
export function setBookRead(bookId: ID): Bluebird<Book.Raw> {
  return Bluebird
    .resolve(database.transaction((t: Transaction) => {
      return Model.Book
        .update({
            available: true
          },
          {
            where: {
              bookId: bookId
            },
            transaction: t
          });
    }))
    .then((book: Instance<any>) => {
      return book.get({plain: true});
    });
}