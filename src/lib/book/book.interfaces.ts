import { ID } from '../shared/id.type';

/**
 * The base number for our meta ISBNs.
 * @type {number}
 */
export const META_ISBN: number = 9800000000000;  // It's big, but it's OK: javascript support 53 bit integers

export interface Raw {
  /**
   * The book's unique ID.
   */
  bookId: ID;

  /**
   * The book's ISBN, if it has one.
   */
  isbn?: number | string;

  /**
   * The book's original owner ID.
   */
  origin: ID;

  /**
   * Whether or not the book is available to borrow.
   */
  available: boolean;
}

export interface Borrowing {
  /**
   * The borrowing's ID.
   */
  borrowId: ID;

  /**
   * The ID of the user who borrowed the book.
   */
  userId: ID;

  /**
   * The ID of the borrowed book.
   */
  bookId: ID;

  /**
   * The timestamp at which the book was borrowed.
   */
  beginDate: Date;

  /**
   * The date at which the book was given back.
   * Set to undefined if not given back yet.
   */
  dateOfReturn?: Date;
}