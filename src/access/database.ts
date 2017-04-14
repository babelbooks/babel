import * as Bluebird  from 'bluebird';
import { Model }      from './orm';

// TODO: remove this after tests
export function getAllUsers(): Bluebird<any> {
  return Bluebird
    .resolve(Model.User.findAll())
    .map((user: any) => {
      let u: any = Object.assign(user.dataValues);
      delete u.Password;
      return u;
    });
}