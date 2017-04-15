import * as Bluebird  from 'bluebird';
import { Model }      from './orm';
import * as User      from '../lib/user/user.interfaces';
import * as Book      from '../lib/book/book.interfaces';

function sanitizeUser(user: any): any {
  delete user.password;
  return user;
}

function sanitizeBookInfoForInsert(book: Book.Info): any {
  delete book.id;
  let s: string = '';
  for(let genre of book.genres) {
    s += genre + ',';
  }
  delete book.genres;
  let b = Object.assign(book);
  b.genres = s.substring(0, s.length - 1);
  console.log(b);
  return b;
}

export function getUserById(userId: User.ID): Bluebird<User.Info> {
  return Bluebird.resolve(Model.User
    .findById(userId))
    .then((user: any) => {
      return sanitizeUser(Object.assign(user.dataValues));
    });
}

export function getUserBooks(userID: User.ID): Bluebird<User.Books> {
  return Bluebird.resolve(Model.Book
    .findAll({
      where: {
        userID: userID
      }
    }))
    .then((books: any[]) => {
      let lib: User.Books = {
        userID: userID,
        booksID: []
      };
      for(let b of books) {
        lib.booksID.push(b.dataValues.bookId);
      }
      return lib;
    });
}

export function getUserAvailableBooks(userID: User.ID): Bluebird<User.Books> {
  return Bluebird.resolve(Model.Book
    .findAll({
      where: {
        userID: userID,
        dateOfReturn: null
      }
    }))
    .then((books: any[]) => {
      let lib: User.Books = {
        userID: userID,
        booksID: []
      };
      for(let b of books) {
        lib.booksID.push(b.dataValues.bookId);
      }
      return lib;
    });
}

// export function getUserCurrentBooks(userID: User.ID): Bluebird<User.Books> {
//   // return Bluebird.resolve(Model.Book
//   //   .findAll({
//   //     where: {
//   //       userID: userID,
//   //       dateOfReturn: null
//   //     }
//   //   }))
//   //   .then((books: any[]) => {
//   //     let lib: User.Books = {
//   //       userID: userID,
//   //       booksID: []
//   //     };
//   //     for(let b of books) {
//   //       lib.booksID.push(b.dataValues.bookId);
//   //     }
//   //     return lib;
//   //   });
// }

export function getAllAvailableBooks() : Bluebird<Book.Raw> {
  return Bluebird.resolve(Model.Book
    .findAll({
      where: {
        available: true
      }
    }))
    .then((book: any) => {
      return Object.assign(book.dataValues);
    });
}

export function getBookById(bookID: Book.ID): Bluebird<Book.Raw> {
  return Bluebird.resolve(Model.Book
    .findById(bookID))
    .then((book: any) => {
      return Object.assign(book.dataValues);
    });
}

export function addBook(userID: User.ID, bookData: Book.Info | number | string): Bluebird<any> {  // TODO: type ID
  return Bluebird
    .try(() => {
      if(typeof bookData == 'object') {
        return Model
          .Metadata.create(sanitizeBookInfoForInsert(bookData))
          .then((res: any) => {
            if(res) {
              return Model.Book.create({userID: userID, bookID: res.dataValues.metaDataId});
            }
          });
      }
      return Model.Book.create({userID: userID, bookID: bookData});
    });
}

export function addMetadata(book: Book.Info): Bluebird<any> {
  // TODO: check for already existing metadata
  return Bluebird.resolve(
    Model.Metadata.create(sanitizeBookInfoForInsert(book))
  );
}

export function getBookMetadata(bookID: Book.ID): Bluebird<Book.Info> {
  return getBookById(bookID)
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
      info.id = bookID;
      return info;
    });
}

export function test(): Bluebird<any> {
  return getBookMetadata(1);
  // return Bluebird
  //   .resolve(Model.Borrow.findAll({
  //     include: [Model.Book]
  //   }))
  //   .map((res: any) => {
  //     return res.get({plain: true});
  //   });
}

test()
  .then((res: any) => {
    console.log(res);
    process.exit(0);
  })
  .catch((err: Error) => {
    console.error('ERR');
    console.error(err);
    process.exit(1);
  });