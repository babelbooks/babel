/**
 * The type of the unique identifier that every Book must have.
 */
export type ID = number;

export interface Info {
  /**
   * The book's unique ID.
   */
  id: ID;

  /**
   * The books ISBN, if it exists.
   * If the book hasn't any ISBN, then it's -1.
   */
  isbn: number;

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
}