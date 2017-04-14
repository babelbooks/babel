import * as express from 'express';

import * as Book    from '../../lib/book/book.interfaces';
import * as OMBook  from './book.bo';

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

router.get('/:bookID', (req: express.Request, res: express.Response) => {
  return OMBook
    .getBookInfo(req.params['bookID'])
    .then((info: Book.Info) => {
      return res
        .status(200)
        .json(info);
    });
});

export default router;