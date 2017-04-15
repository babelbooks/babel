import * as Bluebird from 'bluebird';

import { Book } from '../../lib';
import { ID }   from '../../lib';

/**
 * Returns all information known about the given book,
 * identified by the given ID.
 * If no bok is known for this ID,
 * returns an undefined object.
 * @param id
 * @returns {Bluebird<Book.Metadata>}
 */
export function getBookInfo(id: ID) : Bluebird<Book.Metadata> {
  let info: Book.Metadata = {
    bookId: id,
    metaDataId: 42,
    isbn: 9782226216007,
    title: 'Lisey\'s story',
    genres: ['horror', 'fiction'],
    author: 'Stephen King'
  };
  return Bluebird.resolve(info);
}