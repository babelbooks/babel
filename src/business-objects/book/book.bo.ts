import * as Bluebird  from 'bluebird';
import * as services  from '../../access/book.access';
import * as metadata  from '../../access/metadata.access';
import { Book, ID }   from '../../lib';

/**
 * Returns all information known about the given book,
 * identified by the given ID.
 * If no bok is known for this ID,
 * returns an undefined object.
 * @param bookId
 * @returns {Bluebird<Book.Metadata>}
 */
export function getBookInfo(bookId: ID): Bluebird<Book.Metadata> {
  return metadata.getBookMetadata(bookId);
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
 * Adds the given book with the associated metadata, if provided.
 * @param userId The ID of the user who wants to add the book.
 * @param metadata The metadata or metadata ID associated to the book.
 * @returns {Bluebird<any>}
 */
export function addBook(userId: ID, metadata: Book.Metadata | ID): Bluebird<any> {
  return services.addBook(userId, metadata);
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