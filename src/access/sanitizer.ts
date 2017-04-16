import { Book } from '../lib';
import { User } from '../lib';

export function sanitizeUser(user: any): any {
  delete user.password;
  return user;
}

export function sanitizeUserForInsert(user: User.Info): any {
  delete user.userId;
  delete user.signUpDate;
  user.points = 2;        // TODO: define default value somewhere
  user.score = 0;         // TODO: define default value somewhere
  return user;
}

export function sanitizeMetadataForInsert(book: Book.Metadata): any {
  delete book.bookId;
  delete book.metaDataId;
  let s: string = '';
  for(let genre of book.genres) {
    s += genre + ',';
  }
  delete book.genres;
  let b = Object.assign(book);
  // TODO: add the following line when db will handle genres
  // b.genres = s.substring(0, s.length - 1);
  return b;
}