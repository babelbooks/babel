import * as Bluebird  from 'bluebird';
import * as services  from '../../access/book.access';
import { Book, ID }   from '../../lib';

/**
 * Returns all information known about the given book,
 * identified by the given ID.
 * If no bok is known for this ID,
 * returns an undefined object.
 * @param bookId
 * @returns {Bluebird<Book.Raw>}
 */
export function getBookById(bookId: ID): Bluebird<Book.Raw> {
  return services.getBookById(bookId);
}

/**
 * Returns the list of all available books.
 * TODO: use page limit.
 * @returns {Bluebird<Book.Raw[]>}
 */
export function getAllAvailableBooks(): Bluebird<Book.Raw[]> {
  return services.getAllAvailableBooks();
}

/**
 * Adds the given book to the database.
 * @param book Basic information about the book to insert.
 * @returns {Bluebird<any>}
 */
export function addBook(book: Book.Raw): Bluebird<any> {
  return services.addBook(book);
}

/**
 * Set the given book as read by its current owner.
 * It therefore becomes available again.
 * If the book was already available, does nothing.
 * @param bookId The ID of the book to mark as read.
 * @returns {Bluebird<any>}
 */
export function setBookRead(bookId: ID): Bluebird<any> {
  return services.setBookRead(bookId);
}