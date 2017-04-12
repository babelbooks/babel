import * as Bluebird from 'bluebird';

import * as User from './user.interfaces';

export function getUserBooks(userID: User.ID): Bluebird<User.Books> {
  let mockBooks: User.Books = {
    userID: userID,
    booksID: [
      1, 3
    ]
  };
  return Bluebird.resolve(mockBooks);
}