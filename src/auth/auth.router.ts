import * as Passport    from 'passport';
import { Router }       from 'express';
import { Request }      from 'express';
import { Response }     from 'express';
import { NextFunction } from 'express';

let router: Router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  Passport.authenticate('local', (err: any, user: any, info: any) => {
    if(err || !user) {
      return next(err);
    }
    req.login(user, (err: any) => {
      if(err) {
        return next(err);
      }
      return next();
    });
    return res.status(200).json({
      authenticated: true
    });
  })(req, res, next);
});

export default router;