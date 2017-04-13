import * as Bluebird  from 'bluebird';
import * as isbn      from 'node-isbn';

// NOTE: alternatives to node-isbn are:
//  -> http://isbndb.com/
//  -> buy a database such as https://gumroad.com/l/RKxO

export function getBookInfo(isbnNumber: string | number): Bluebird<any> {
  return new Bluebird((resolve: (...params: any[]) => any, reject: (...params: any[]) => any) => {
    isbn.resolve(isbnNumber, (err: Error, book: isbn.Response) => {
      if(err) {
        return reject(err);
      }
      return resolve(book);
    });
  });
}