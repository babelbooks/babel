import * as Passport    from 'passport';
import { Router }       from 'express';
import { Request }      from 'express';
import { Response }     from 'express';
import { NextFunction } from 'express';

let router: Router = Router();

// router.post('/login', Passport.authenticate('local'));

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  console.log('POST /login');
  console.log('Body is:');
  console.log(req.body);
  Passport.authenticate('local', (err: any, user: any, info: any) => {
    if(err || !user) {
      console.error('ERROR: Unable to authenticate');
      console.error(err);
      return next(err);
    }
    console.log('INFO:');
    console.log(info);
    console.log('User:');
    console.log(user);
    console.log('Logging in...');
    req.login(user, (err: any) => {
      if(err) {
        console.log('ERROR: unable to log in');
        console.log(err);
        return next(err);
      }
      console.log('Successfully logged in. Calling next.');
      return next();
    });
    return res.status(200).json({
      authenticated: true
    });
  })(req, res, next);
});

export default router;