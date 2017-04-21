import { ID } from '../shared/id.type';

/**
 * The list of book that an user has.
 * They can belong to him, or he may rent them,
 * or he may only be their original owner.
 */
export interface Books {
  /**
   * The user's ID/
   */
  username: ID;

  /**
   * The list of all books' IDs and ISBNs for a given user.
   */
  books: {bookId: ID, isbn: ID}[];
}

/**
 * Global information about an user.
 * It may carry the user's hashed password.
 * It's hashed, so it's ok as long as we:
 *    Never write it somewhere on the disk, except for database.
 *    Never send it back anywhere; it must stay here.
 *    Never print it into the logs; just in case.
 * Therefore, before any manipulation, we must use the functions
 * provided in src/access/sanitizer.ts.
 */
export interface Info {
  /**
   * The user's ID.
   */
  username: ID;

  /**
   * The user's hashed password.
   */
  password?: string;

  /**
   * The user's first name.
   */
  firstName: string;

  /**
   * The user's last name.
   */
  lastName: string;

  /**
   * The user's score (gamification).
   */
  score: number;

  /**
   * The user's number of points (=BabelBooks' money).
   */
  points: number;

  /**
   * The timestamp at which the user registered.
   */
  signUpDate: Date;
}