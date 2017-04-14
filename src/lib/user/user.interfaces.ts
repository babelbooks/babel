import * as Book  from '../book/book.interfaces';

/**
 * The type of the unique identifier that every User must have.
 */
export type ID = number;

export interface Books {
  /**
   * The user's ID/
   */
  userID: ID;

  /**
   * The list of all books' IDs for a given user.
   */
  booksID: Book.ID[];
}

export interface Info {
  /**
   * The user's ID.
   */
  userID: ID;

  /**
   * The user's identifier.
   */
  username: string;

  /**
   * The user's last name.
   */
  lastName: string;

  /**
   * The user's first name.
   */
  firstName: string;

  /**
   * The user's number of points (=BabelBooks' money).
   */
  points: number;

  /**
   * The user's score (gamification).
   */
  score: number;

  /**
   * The timestamp at which the user registered.
   */
  signUpDate: Date;
}