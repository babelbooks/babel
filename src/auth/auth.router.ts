import * as Passport    from 'passport';
import { Router }       from 'express';
import { Request }      from 'express';
import { Response }     from 'express';
import { NextFunction } from 'express';

let router: Router = Router();

/**
 * POST /login
 * username: string
 * password: string
 *
 * Allows an user to log in, if he provides the right credentials.
 * If so, it returns a 200 status code along with a small JSON object.
 * Otherwise, it sends back a 400 status code.
 */
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

/**
 * POST /logout
 *
 * Allows an user to log out.
 * If successful, it returns a 200 status code along with a small JSON object.
 * This is not supposed to fail. If so, it therefore will send a 500 response.
 */
router.post('/logout', (req: Request, res: Response) => {
  req.logout();
  res.status(200).json({
    loggedOut: true
  });
});

export default router;