import * as express     from 'express';
import * as bodyparser  from 'body-parser';
import * as session     from 'express-session';
import * as cors        from 'cors';
import * as passport    from 'passport';
import * as morgan      from 'morgan';

import { configPassport }       from './auth/auth.config';
import { ensureAuthenticated }  from './auth/auth.middlewares';
import { skipFor }              from './auth/auth.middlewares';

import * as user  from './business-objects/user/user.router';
import * as book  from './business-objects/book/book.router';
import {default as authRouter}  from './auth/auth.router';

/**
 * Create server app.
 */
const app : any = express();

/**
 * Configure server app.
 */
// Set environment
app.set('port', process.env.BB_BABEL_PORT || 3000);

// Allow CORS
app.use(cors({
  origin: process.env.BB_PRES_URL || '*',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Parse JSON object in POST/PUT/etc
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

// Configure session (user authentication)
app.use(session({
  secret: process.env.BB_SECRET_SESSION || 'my very secret thing',
  resave: true,
  saveUninitialized: true,
  cookie: {           // A cookie-based sessions
    secure: false,    // Because without https, the client won't send it back to us if this is true
    sameSite: true,   // To prevent CSRF attacks
    httpOnly: false   // To handle xhr requests, and some other

    // NOTE: by not providing "maxAge", we create "session" cookies
  }
}));

// Use logger
app.use(morgan('dev'));

// Configure passport (user authentication)
configPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Add a test path
app.get('/test', (req: any, res: any) => res.status(200).json({
  path: req.originalUrl,
  status: 200,
  comment: 'it\'s working!'
}));

// Mount sub routers
app.use('/auth', authRouter);
app.use('/user', skipFor(ensureAuthenticated, user.noNeedToCheck), user.router);
app.use('/book', skipFor(ensureAuthenticated, book.noNeedToCheck), book.router);

/**
 * Run the server.
 */
app.listen(app.get('port'), () => {
  console.log('Server running on port ' + app.get('port'));
});
