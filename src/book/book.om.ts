import * as Bluebird from 'bluebird';

import * as Book from './book.interfaces';

/**
 * Returns all information known about the given book,
 * identified by the given ID.
 * If no bok is known for this ID,
 * returns an undefined object.
 * @param id
 * @returns {Bluebird<Book.Info>}
 */
export function getBookInfo(id: Book.ID) : Bluebird<Book.Info> {
  let info: Book.Info = {
    id: id,
    isbn: 9782226216007,
    title: 'Lisey\'s story',
    genre: ['horror', 'fiction'],
    author: 'Stephen King'
  };
  return Bluebird.resolve(info);
}