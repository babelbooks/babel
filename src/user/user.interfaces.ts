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