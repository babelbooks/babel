import * as Bluebird    from 'bluebird';
import { Transaction }  from 'sequelize';
import { Instance }     from 'sequelize';
import {database, Model}        from '../utils/orm';
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