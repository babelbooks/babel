import { ID } from '../shared/id.type';

export interface Raw {
  /**
   * The unique borrow's ID.
   */
  borrowId: ID;

  /**
   * The associated book's ID.
   */
  bookId: ID;

  /**
   * The associated user's ID.
   */
  userId: ID;

  /**
   * The begin date of the borrow.
   */
  beginDate: Date;

  /**
   * The supposed date to which the book must be
   * returned to its owner.
   */
  dateOfReturn?: Date;
}