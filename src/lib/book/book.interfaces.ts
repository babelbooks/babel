import { ID } from '../shared/id.type';

export interface Raw {
  /**
   * The book's unique ID.
   */
  bookId: ID;

  /**
   * The book's metadata ID.
   */
  bookMetaDataId: ID;

  /**
   * The book's owner ID.
   */
  userId: ID;

  /**
   * Whether or not the book is available to borrow.
   */
  available: boolean;
}

export interface Metadata {
  /**
   * The metadata's unique ID.
   */
  metaDataId: ID;

  /**
   * The book's unique ID to which
   * these metadata are for.
   */
  bookId: ID;

  /**
   * The books ISBN, if it exists..
   */
  isbn?: number;

  /**
   * The book's title.
   * TODO: languages.
   */
  title: string;

  /**
   * The list of genres the book is known of.
   */
  genres: string[];

  /**
   * The author's name.
   */
  author: string;

  /**
   * The book's edition (one of them).
   */
  edition?: string;

  /**
   * Whether if the book is a novel, a short story
   * or anything else.
   */
  majorForm?: string;

  /**
   * An url to the book's cover.
   */
  cover?: string;
}