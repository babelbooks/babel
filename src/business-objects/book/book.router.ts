import * as express from 'express';
import * as OMBook  from './book.bo';
import { Book }     from '../../lib';

let router: express.Router = express.Router();

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
 * Returns an Book.Metadata object as json if the request was correct.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/:bookId', (req: express.Request, res: express.Response) => {
  return OMBook
    .getBookInfo(req.params['bookId'])
    .then((info: Book.Metadata) => {
      return res
        .status(200)
        .json(info);
    });
});

/**
 * GET /available
 *
 * Gather all books available for borrowing.
 * If no book is available, returns an empty array.
 */
router.get('/available', (req: express.Request, res: express.Response) => {
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
 * userId: ID
 * metaData: Book.Metadata || metaDataId: ID
 *
 * Tries to create a book from the given object,
 * and returns a 201 CREATED status if successful.
 * If metaData is provided instead of metaDataId, tries
 * to create metadata as well.
 * Otherwise, returns a 400 BAD REQUEST along with a json object
 * describing the error.
 */
router.put('/add', (req: express.Request, res: express.Response) => {
  if(!req.body.userId || !(req.body.metaData || req.body.metaDataId)) {
    return res.status(400).json(new Error(
      'Missing field. It must have "userId" and one of "metaData" | "metaDataId".'
    ));
  }
  return OMBook
    .addBook(req.body.userId, req.body.metaData || req.body.metaDataId)
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

export default router;