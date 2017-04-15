import * as Bluebird  from 'bluebird';
import { Model }      from './orm';
import { Book }       from '../lib';
import { ID }         from '../lib';
import { sanitizeMetadataForInsert }  from './sanitizer';
import { getBookById }                from './book.access';

/**
 * Returns the raw metadata identified by the given ID.
 * If no metadata exists with such an ID,
 * returns a promise rejection.
 * @param dataId The book's ID.
 * @returns {Bluebird<any>}
 */
export function getMetadataById(dataId: ID): Bluebird<any> {
  // TODO: type this
  return Bluebird.resolve(Model.Metadata
    .findById(dataId))
    .then((data: any) => {
      if(!data) {
        return Bluebird.reject(new Error('No Metadata found with the ID: ' + dataId));
      }
      return data.get({plain: true});
    });
}

/**
 * Adds the given metadata into the database.
 * If there is an ID provided in the object,
 * it removes it first.
 * @param data The metadata to insert.
 * @returns {Bluebird<any>}
 */
export function addMetadata(data: Book.Metadata): Bluebird<any> {
  // TODO: check for already existing metadata ?
  // TODO: type that
  return Bluebird
    .resolve(Model.Metadata
      .create(sanitizeMetadataForInsert(data)
    ))
    .then((res: any) => {
      return res.get({plain: true});
    });
}

/**
 * Returns the metadata associated to the given book.
 * If no books exists for the given ID, or if no metadata
 * exists (this would mean BIG problem), returns a promise rejection.
 * @param bookId The ID of the book for which find metadata.
 * @returns {Bluebird<Book.Metadata>}
 */
export function getBookMetadata(bookId: ID): Bluebird<Book.Metadata> {
  return getBookById(bookId)
    .then((book: any) => {
      return Model.Book.find({
        where: {
          bookId: book.bookId
        },
        include: [{
          model: Model.Metadata,
          as: 'metadata'
        }]
      })
    })
    .then((res: any) => {
      if(!res) {
        return Bluebird.reject(new Error('Unable to gather Metadata for the book with the ID: ' + bookId));
      }
      return res.get({plain: true});
    })
    .then((res: any) => {
      if(!res) {
        return Bluebird.reject(new Error('Unable to gather Metadata for the book with the ID: ' + bookId));
      }
      let info: Book.Metadata = res.metadata;
      info.bookId = bookId;
      return info;
    });
}