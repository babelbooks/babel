import * as express from 'express';

import {default as userRouter} from './business-objects/user/user.router';
import {default as bookRouter} from './business-objects/book/book.router';

// Create server app
const app : any = express();

// Configure server app
app.set('port', process.env.PORT || 3000);
app.use('/user', userRouter);
app.use('/book', bookRouter);

// Run the server
app.listen(app.get('port'), () => {
  console.log('Server running on port ' + app.get('port'));
});