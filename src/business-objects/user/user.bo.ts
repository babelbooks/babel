import * as Bluebird from 'bluebird';

import * as User from '../../lib/user/user.interfaces';

/**
 * Gather the list of all books fot the given user
 * (identified by the given ID).
 * If the user hasn't any books yet, returns an object
 * with an empty array.
 * @param userID The user's ID.
 * @returns {Bluebird<User.Books>}
 */
export function getUserLibrary(userID: User.ID): Bluebird<User.Books> {
  let mockBooks: User.Books = {
    userID: userID,
    booksID: [
      1, 3
    ]
  };
  return Bluebird.resolve(mockBooks);
}

/**
 * Returns all user's information that can be safely
 * broadcast. I.e. some data such has the hashed password
 * won't be sent here.
 * @param userID
 * @returns {Bluebird<any>}
 */
export function getUserInfo(userID: User.ID): Bluebird<User.Info> {
  let mockUser: User.Info = {
    userID: userID,
    username: 'johndoe27',
    lastName: 'Doe',
    firstName: 'John',
    points: 2,
    score: 21,
    signUpDate: new Date(Date.now())
  };
  return Bluebird.resolve(mockUser);
}