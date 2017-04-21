import { User } from '../lib';
import { Book } from '../lib';

/**
 * Ensures that the given user object
 * can be safely broadcast.
 * @param user The user to sanitize.
 * @returns {User.Info}
 */
export function sanitizeUser(user: User.Info): User.Info {
  // The password must never be broadcast, so we delete it
  // The rest is fine
  delete user.password;
  return user;
}

/**
 * Ensures that the given user object
 * can be safely inserted in the database.
 * @param user The user to sanitize.
 * @returns {User.Info}
 */
export function sanitizeUserForInsert(user: User.Info): any {
  // Delete values which can cause a mess and let database handle default values
  delete user.signUpDate;
  delete user.points;
  delete user.score;
  return user;
}

/**
 * Ensures that the given book object
 * can be safely inserted in the database.
 * @param book The book to sanitize.
 * @returns {Book.Raw}
 */
export function sanitizeBookForInsert(book: Book.Raw): any {
  let b: any = book;
  // Delete values which can cause a mess and let database handle default values
  delete b.bookId;
  // Cast the boolean into a number for insert
  b.available = book.available ? 1 : 0;
  return b;
}