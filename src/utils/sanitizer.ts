import { User }         from '../lib';
import { Book }         from '../lib';
import { Appointment }  from '../lib';
import * as crypto      from 'crypto';

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
  // Crypt password
  let hash = crypto.createHash('sha512');
  hash.update(user.password);
  user.password = '0x' + hash.digest('hex');
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

/**
 * Ensures that the given appointment object
 * can be safely inserted in the database.
 * @param meeting The appointment to sanitize.
 * @returns {any}
 */
export function sanitizeAppointmentForInsert(meeting: Appointment.Raw): any {
  // Delete values which can cause a mess and let database handle default values
  delete meeting.appointmentId;
  return meeting;
}

/**
 * Ensures that the given location object
 * can be safely inserted in the database.
 * @param loc The location to sanitize.
 * @returns {any}
 */
export function sanitizeLocationForInsert(loc: Appointment.Location): any {
  // Delete values which can cause a mess and let database handle default values
  delete loc.depositLocationId;
  return loc;
}