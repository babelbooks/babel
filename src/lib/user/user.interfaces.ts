import { ID } from '../shared/id.type';

export interface Books {
  /**
   * The user's ID/
   */
  userId: ID;

  /**
   * The list of all books' IDs for a given user.
   */
  booksId: ID[];
}

export interface Info {
  /**
   * The user's ID.
   */
  userId: ID;

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