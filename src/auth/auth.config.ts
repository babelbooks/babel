import * as Crypto        from 'crypto';
import { PassportStatic } from 'passport';
import { Strategy }       from 'passport-local';
import { Model }          from '../access/orm';

/**
 * Configure the given passport object to use
 * a local authentication strategy.
 * @param passport The passport object to configure.
 */
export function configPassport(passport: PassportStatic): void {
  // Configure serialization
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // Configure deserialization
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Configure local strategy
  passport.use(new Strategy((username: string, pass: any, done: (...args: any[]) => any) => {
    let hash = Crypto.createHash('sha512');
    hash.update(pass);
    return Model.User
      .findOne({
        where: {
          username: username,
          password: '0x' + hash.digest('hex')
        }
      })
      .then((user: any) => {
        if(!user) {
          console.error('ERROR: Unable to find an user with such credentials');
          return done(null, false, {
            message: 'Unable to find an user with such credentials'
          });
        }
        console.log('SUCCESS: User authenticated');
        return done(null, {
          username: user.username
        });
      })
      .catch((err: Error) => {
        console.error('ERROR: Unable to execute query correctly');
        return done(null, false, {
          message: err
        });
      });
  }));
}