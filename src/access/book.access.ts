import * as Bluebird    from 'bluebird';
import { Transaction }  from 'sequelize';
import { Model }        from './orm';
import { database }     from './orm';
import { Book }         from '../lib';
import { ID }           from '../lib';
import { sanitizeMetadataForInsert }  from './sanitizer';

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
    .then((book: any) => {
      if(!book) {
        return Bluebird.reject(new Error('No Book found with the ID: ' + bookId));
      }
      return book.get({plain: true});
    });
}

/**
 * Returns the list of all available books
 * in the database.
 * If no book is available, returns an empty array.
 * @returns {Bluebird<Book.Raw[]>}
 */
export function getAllAvailableBooks(): Bluebird<Book.Raw[]> {
  return Bluebird.resolve(Model.Book
    .findAll({
      where: {
        available: true
      }
    }))
    .map((book: any) => {
      return book.get({plain: true});
    });
}

/**
 * Adds the given book along with it's metadata if not provided as an ID.
 * It also removes the metadata's ID if provided with the object,
 * as long as the book's ID.
 * If something went wrong somewhere (i.e. the provided user ID
 * doesn't match any known user, or something similar),
 * returns a promise rejection.
 * @param userID The user's ID.
 * @param bookData The associated metadata or metadata ID.
 * @returns {Bluebird<any>}
 */
export function addBook(userID: ID, bookData: Book.Metadata | ID): Bluebird<any> {
  return Bluebird
    .try(() => {
      if(typeof bookData == 'object') {
        return database.transaction((t: Transaction) => {
          return Model.Metadata
            .create(sanitizeMetadataForInsert(bookData), {
              transaction: t
            })
            .then((res: any) => {
              if(res) {
                return Model.Book.create({userID: userID, bookId: res.get({plain: true}).metaDataId});
              }
              return Bluebird.reject(new Error('Unable to create the provided metadata.'));
            });
        });
      }
      return database.transaction((t: Transaction) => {
        return Model.Book
          .create({userID: userID, bookId: bookData}, {
            transaction: t
          });
      });
    });
}

/**
 * Sets the given book as available.
 * If the book was already available, does nothing.
 * @param bookId The book's ID.
 * @returns {Bluebird<Promise>}
 */
export function setBookRead(bookId: ID): Bluebird<any> {
  return Bluebird.resolve(database.transaction((t: Transaction) => {
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
  }));
}