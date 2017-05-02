import * as Bluebird    from 'bluebird';
import { Transaction }  from 'sequelize';
import { Instance }     from 'sequelize';
import { Model}         from '../utils/orm';
import { database }     from '../utils/orm';
import { Appointment }  from '../lib';
import { ID }           from '../lib';

import { sanitizeAppointmentForInsert } from '../utils/sanitizer';
import { sanitizeLocationForInsert }    from '../utils/sanitizer';

/**
 * Returns the raw appointment identified by the given ID.
 * If no book appointment exists with such an ID,
 * returns an undefined object.
 * @param id The appointment's ID.
 * @returns {Bluebird<Appointment.Raw>}
 */
export function getAppointmentById(id: ID): Bluebird<Appointment.Raw> {
  return Bluebird.resolve(Model.Appointment
    .findById(id))
    .then((app: Instance<any>) => {
      if(!app) {
        return Bluebird.reject(new Error('No Appointment found with the ID: ' + id));
      }
      return app.get({plain: true});
    });
}

/**
 * Returns the raw location identified by the given ID.
 * If no book location exists with such an ID,
 * returns an undefined object.
 * @param id The location's ID.
 * @returns {Bluebird<Appointment.Location>}
 */
export function getLocationById(id: ID): Bluebird<Appointment.Location> {
  return Bluebird.resolve(Model.Location
    .findById(id))
    .then((loc: Instance<any>) => {
      if(!loc) {
        return Bluebird.reject(new Error('No Location found with the ID: ' + id));
      }
      return loc.get({plain: true});
    });
}

/**
 * Returns an array of all appointments where the given user
 * as to pass a book.
 * @param userId The user from which to pass books.
 * @returns {Bluebird<Appointment.Full[]>}
 */
export function getAppointmentsForUser(userId: ID): Bluebird<Appointment.Full[]> {
  return Bluebird.resolve(Model.Appointment
    .findAll({
      where: {
        currentOwnerId: userId
      },
      include: [
        {
          model: Model.Borrow
        },
        {
          model: Model.Location
        }
      ]
    }))
    .map((res: any) => {
      return res.get({plain: true}).appointment;
    });
}

/**
 * Returns an array of all appointments where the given user
 * as to retrieve a book.
 * @param userId The user from which to pass books.
 * @returns {Bluebird<Appointment.Full[]>}
 */
export function getAppointmentsWithUser(userId: ID): Bluebird<Appointment.Full[]> {
  return Bluebird.resolve(Model.Appointment
    .findAll({
      include: [
        {
          model: Model.Borrow,
          where: {
            userId: userId
          }
        },
        {
          model: Model.Location
        }
      ]
    }))
    .map((res: any) => {
      return res.get({plain: true}).appointment;
    });
}

/**
 * Removes the appointment identified by the given ID
 * from the database.
 * Returns a promise rejection upon failure.
 * @param id The id of the appointment to delete.
 * @returns {Bluebird<void>}
 */
export function removeAppointmentById(id: ID): Bluebird<void> {
  return Bluebird.resolve(
    database.transaction((t: Transaction) => {
      return Model.Appointment
        .destroy({
          where: {
            appointmentId: id
          },
          transaction: t
        });
    }))
    .then((value: number) => {
      if(value !== 1) {
        return Bluebird.reject(new Error('No Appointment found with the ID: ' + id));
      }
    });
}

/**
 * Adds an appointment to the database.
 * Before doing so, removes and reset some fields to default values.
 * If there was a problem with the insert, return a promise rejection.
 * Returns the inserted appointment upon success.
 * @param meeting The appointment to insert.
 */
export function addAppointment(meeting: Appointment.Raw): Bluebird<Appointment.Raw> {
  return Bluebird
    .resolve(database.transaction((t: Transaction) => {
      return Model.Appointment
        .create(sanitizeAppointmentForInsert(meeting), {
          transaction: t
        });
    }))
    .then((meet: Instance<any>) => {
      return meet.get({plain: true});
    });
}

/**
 * Adds an appointment to the database.
 * Before doing so, removes and reset some fields to default values.
 * If there was a problem with the insert, return a promise rejection.
 * Returns the inserted location upon success.
 * @param loc The location to insert.
 */
export function addLocation(loc: Appointment.Location): Bluebird<Appointment.Location> {
  return Bluebird
    .resolve(database.transaction((t: Transaction) => {
      return Model.Location
        .create(sanitizeLocationForInsert(loc), {
          transaction: t
        });
    }))
    .then((location: Instance<any>) => {
      return location.get({plain: true});
    });
}