import * as Bluebird  from 'bluebird';
import { Model }      from './orm';
import { Book }       from '../lib';
import { sanitizeBookInfoForInsert }  from './sanitizer';
import { getBookById }                from './book.access';

export function addMetadata(book: Book.Info): Bluebird<any> {
  // TODO: check for already existing metadata
  return Bluebird.resolve(
    Model.Metadata.create(sanitizeBookInfoForInsert(book))
  );
}

export function getBookMetadata(bookId: Book.ID): Bluebird<Book.Info> {
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
      return res.get({plain: true});
    })
    .then((res: any) => {
      let info: Book.Info = res.metadata;
      info.id = bookId;
      return info;
    });
}