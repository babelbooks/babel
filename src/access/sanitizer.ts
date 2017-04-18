import { User } from '../lib';
import { Book } from '../lib';

export function sanitizeUser(user: User.Info): User.Info {
  // The password must never be broadcast, so we delete it
  // The rest is fine
  delete user.password;
  return user;
}

export function sanitizeUserForInsert(user: User.Info): any {
  // Delete values which can cause a mess and let database handle default values
  delete user.signUpDate;
  delete user.points;
  delete user.score;
  return user;
}

export function sanitizeBookForInsert(book: Book.Raw): any {
  // Delete values which can cause a mess and let database handle default values
  delete book.bookId;
  return book;
}