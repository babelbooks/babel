import * as express   from 'express';
import * as OMBook    from './book.bo';
import { Book }       from '../../lib';
import { Authorized } from '../../auth/auth.middlewares';

/**
 * The router associated to books.
 * Configured hereinafter.
 * @type {Router}
 */
export let router: express.Router = express.Router();

/**
 * GET /test
 *
 * To test if the book router is working.
 * Returns a 200 status code and a small json object if working.
 */
router.get('/test', (req: express.Request, res: express.Response) => {
  return res
    .status(200)
    .json({
      endpoint: req.originalUrl,
      status: 200,
      comment: 'it\'s working!'
    });
});

/**
 * GET /:bookId
 *
 * Returns an Book.Raw object as json if the request was correct.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/:bookId', (req: express.Request, res: express.Response) => {
  return OMBook
    .getBookById(req.params['bookId'])
    .then((book: Book.Raw) => {
      return res
        .status(200)
        .json(book);
    });
});

/**
 * GET all/available
 *
 * Gather all books available for borrowing.
 * If no book is available, returns an empty array.
 */
router.get('/all/available', (req: express.Request, res: express.Response) => {
  return OMBook
    .getAllAvailableBooks()
    .then((books: Book.Raw[]) => {
      return res
        .status(200)
        .json(books);
    });
});

/**
 * PUT /add
 * book: Book.Raw
 *
 * Tries to create a book from the given object,
 * and returns a 201 CREATED status if successful.
 * Otherwise, returns a 400 BAD REQUEST along with a json object
 * describing the error.
 */
router.put('/add', (req: express.Request, res: express.Response) => {
  if(!req.body.book) {
    return res.status(400).json(new Error(
      'Missing "book" parameter in request body.'
    ));
  }
  return OMBook
    .addBook(req.body.book)
    .then(() => {
      return res.status(201);
    })
    .catch((err: Error) => {
      return res.status(400).json(err);
    });
});

/**
 * POST /read
 * bookId: ID
 *
 * Marks the given book as read by its current owner.
 * Returns the given book along with a 200 status code
 * if successful.
 * Otherwise, returns a 400 BAD REQUEST along with a json object
 * describing the error.
 * TODO: check return type
 */
router.post('/read', (req: express.Request, res: express.Response) => {
  return OMBook
    .setBookRead(req.body.bookId)
    .then((book: any) => {
      return res.status(200).json(book);
    })
    .catch((err: Error) => {
      return res.status(400).json(err);
    });
});

/**
 *
 * @type {[Authorized]}
 */
export const noNeedToCheck: Authorized[] = [
  {
    path: '/test'
  }];
