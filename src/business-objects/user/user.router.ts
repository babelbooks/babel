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
 * GET /:userID
 *
 * Returns an User.Info object (sanitized) as json if the request was correct.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/:userID', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserInfo(req.params['userID'])
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
 * GET /books/:userID
 *
 * Returns an User.Books object as json if the request was correct.
 * Note that this includes an user with no book yet.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/books/:userID', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserLibrary(req.params['userID'])
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
 * GET /books/borrowed/:userID
 *
 * Returns an User.Books object as json if the request was correct.
 * Note that this includes an user with no borrowed book yet.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/books/borrowed/:userID', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserBorrowedBooks(req.params['userID'])
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