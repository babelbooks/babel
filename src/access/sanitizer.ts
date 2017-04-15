import { Book } from '../lib';

export function sanitizeUser(user: any): any {
  delete user.password;
  return user;
}

export function sanitizeBookInfoForInsert(book: Book.Info): any {
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