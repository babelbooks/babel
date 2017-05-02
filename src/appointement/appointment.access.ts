import * as Bluebird    from 'bluebird';
import { Model }        from '../utils/orm';
import { database }     from '../utils/orm';
import { Appointment }  from '../lib';
import { ID }           from '../lib';

/**
 * Returns the raw appointment identified by the given ID.
 * If no book appointment exists with such an ID,
 * returns an undefined object.
 * @param id The appointment ID.
 * @returns {Bluebird<Appointment.Raw>}
 */
export function getAppointmentById(id: ID): Bluebird<Appointment.Raw> {
  return Bluebird.reject(new Error('Not implemented yet!'));
}

/**
 * Returns an array of all appointments where the given user
 * as to pass a book.
 * @param userId The user from which to pass books.
 * @returns {Bluebird<Appointment.Full[]>}
 */
export function getAppointmentsForUser(userId: ID): Bluebird<Appointment.Full[]> {
  return Bluebird.reject(new Error('Not implemented yet!'));
}

/**
 * Returns an array of all appointments where the given user
 * as to retrieve a book.
 * @param userId The user from which to pass books.
 * @returns {Bluebird<Appointment.Full[]>}
 */
export function getAppointmentsWithUser(userId: ID): Bluebird<Appointment.Full[]> {
  return Bluebird.reject(new Error('Not implemented yet!'));
}

/**
 * Removes the appointment identified by the given ID
 * from the database.
 * Returns a promise rejection upon failure.
 * @param id The id of the appointment to delete.
 * @returns {Bluebird<any>}
 */
export function removeAppointmentById(id: ID): Bluebird<any> {
  return Bluebird.reject(new Error('Not implemented yet!'));
}