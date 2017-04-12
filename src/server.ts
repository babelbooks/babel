import * as express from 'express';

import {default as userRouter} from './user/user.router';

// Create server app
const app : any = express();

// Configure server app
app.set('port', process.env.PORT || 3000);
app.use('/user', userRouter);

// Run the server
app.listen(app.get('port'), () => {
  console.log('Server running on port ' + app.get('port'));
});