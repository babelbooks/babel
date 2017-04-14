import * as express from 'express';

import * as OMUser  from './user.bo';
import * as User    from '../../lib/user/user.interfaces';

let router: express.Router = express.Router();

router.get('/test', (req: express.Request, res: express.Response) => {
  return res
    .status(200)
    .json({
      endpoint: req.originalUrl,
      status: 200,
      comment: 'it\'s working!'
    });
});

router.get('/books/:userID', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserLibrary(req.params['userID'])
    .then((books: User.Books) => {
      return res
        .status(200)
        .json(books);
    });
});

router.get('/:userID', (req: express.Request, res: express.Response) => {
  return OMUser
    .getUserInfo(req.params['userID'])
    .then((info: User.Info) => {
      return res
        .status(200)
        .json(info);
    });
});

export default router;