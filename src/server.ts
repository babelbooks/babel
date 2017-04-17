import * as express       from 'express';
import * as bodyparser    from 'body-parser';
import * as cookieparser  from 'cookie-parser';
import * as session       from 'express-session';
import * as cors          from 'cors';
import * as passport      from 'passport';

import { configPassport }       from './auth/auth.config';
import { ensureAuthenticated }  from './auth/auth';

import {default as userRouter} from './business-objects/user/user.router';
import {default as bookRouter} from './business-objects/book/book.router';
import {default as authRouter} from './auth/auth.router';

// Create server app
const app : any = express();

// Configure server app
app.set('port', process.env.BB_BABEL_PORT || 3000);
app.use(cors({
  origin: process.env.BB_PRES_URL || '*',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(cookieparser());
app.use(session({
  secret: process.env.BB_SECRET_SESSION || 'my very secret thing',
  resave: true,
  saveUninitialized: true
}));

configPassport(passport);

app.use(passport.initialize());
app.use('/auth', authRouter);
app.use('/user', ensureAuthenticated, userRouter);
app.use('/book', ensureAuthenticated, bookRouter);

// Run the server
app.listen(app.get('port'), () => {
  console.log('Server running on port ' + app.get('port'));
});
