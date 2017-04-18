import * as express from 'express';
import * as OMUser  from './user.bo';
import { User }     from '../../lib';

let router: express.Router = express.Router();

/**
 * GET /test
 *
 * To test if the user router is working.
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
 * GET /:userId
 *
 * Returns an User.Info object (sanitized) as json if the request was correct.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/:userId', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserInfo(req.params['userId'])
    .then((info: User.Info) => {
      return res
        .status(200)
        .json(info);
    })
    .catch((err: Error) => {
      return res
        .status(400)
        .json(err);
    });
});

/**
 * GET /:userId/books
 *
 * Returns an User.Books object as json if the request was correct.
 * Note that this includes an user with no book yet.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/:userId/books', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserLibrary(req.params['userId'])
    .then((books: User.Books) => {
      return res
        .status(200)
        .json(books);
    })
    .catch((err: Error) => {
      return res
        .status(400)
        .json(err);
    });
});

/**
 * GET /:userId/books/borrowed
 *
 * Returns an User.Books object as json if the request was correct.
 * Note that this includes an user with no borrowed book yet.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/:userId/books/borrowed', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserBorrowedBooks(req.params['userId'])
    .then((books: User.Books) => {
      return res
        .status(200)
        .json(books);
    })
    .catch((err: Error) => {
      return res
        .status(400)
        .json(err);
    });
});

/**
 * GET /:userId/books/reading
 *
 * Returns an User.Books object as json if the request was correct.
 * Note that this includes an user not reading any book for now.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/:userId/books/reading', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserReadingBooks(req.params['userId'])
    .then((books: User.Books) => {
      return res
        .status(200)
        .json(books);
    })
    .catch((err: Error) => {
      return res
        .status(400)
        .json(err);
    });
});

/**
 * PUT /add
 * user: User.Info
 *
 * Tries to create an user from the given user object,
 * and returns a 201 CREATED status if successful.
 * Otherwise, returns a 400 BAD REQUEST along with a json object
 * describing the error.
 */
router.put('/add', (req: express.Request, res: express.Response) => {
  if(!req.body.user) {
    return res.status(400).json(new Error(
      'Missing "user" parameter in request body.'
    ));
  }
  return OMUser
    .addUser(req.body.user)
    .then(() => {
      return res.status(201);
    })
    .catch((err: Error) => {
      return res.status(400).json(err);
    });
});

export default router;