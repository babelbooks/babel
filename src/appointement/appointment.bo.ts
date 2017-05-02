import * as Bluebird    from 'bluebird';
import * as services    from './appointment.access';
import { Appointment }  from '../lib';
import { ID }           from '../lib';
import 'colors';

/**
 * Returns the appointment identified by the given ID.
 * If no appointment exists with the given ID, returns
 * an undefined object.
 * @param id The user from which to pass books.
 * @returns {Bluebird<Appointment.Full[]>}
 */
export function getAppointmentById(id: ID): Bluebird<Appointment.Raw> {
  return services.getAppointmentById(id);
}

/**
 * Returns an array of all appointments where the given user
 * as to pass a book.
 * Note that this won't send back outdated appointments.
 * In fact, it will delete the outdated appointments from database.
 * @param userId The user from which to pass books.
 * @returns {Bluebird<Appointment.Full[]>}
 */
export function getAppointmentsForUser(userId: ID): Bluebird<Appointment.Full[]> {
  return services
    .getAppointmentsForUser(userId)
    .then((res: Appointment.Full[]) => {
      return updateAppointments(res);
    });
}

/**
 * Returns an array of all appointments where the given user
 * as to retrieve a book.
 * Note that this won't send back outdated appointments.
 * In fact, it will delete the outdated appointments from database.
 * @param userId The user from which to pass books.
 * @returns {Bluebird<Appointment.Full[]>}
 */
export function getAppointmentsWithUser(userId: ID): Bluebird<Appointment.Full[]> {
  return services
    .getAppointmentsWithUser(userId)
    .then((res: Appointment.Full[]) => {
      return updateAppointments(res);
    });
}

/**
 * Filters the given array by removing outdated appointments,
 * and tries to remove outdated appointments from the database.
 * @param appointments The array of appointments to filter and update.
 * @param background Whether the remove task must be started as background task or not.
 * @returns {Bluebird<Appointment.Full[]>}
 */
function updateAppointments(appointments: Appointment.Full[], background: boolean = false): Bluebird<Appointment.Full[]> {
  let ids : ID[] = [];
  for(let i = 0; i < appointments.length; i++) {
    let meeting = appointments[i];
    if(meeting.borrow.beginDate.toDateString() < Date.now().toString()) {   // TODO: in what format are these dates ??
      ids.push(i);
      appointments.splice(i, 1);
    }
  }
  return(Bluebird
    .try(() => {
      if(background) {
        Bluebird.all(ids.map((id: ID) => {
          return services.removeAppointmentById(id);
        }));
      } else {
        return Bluebird.all(ids.map((id: ID) => {
          return services.removeAppointmentById(id);
        }));
      }
    }))
    .catch((err: Error) => {
      console.error('ERROR:'.red + ' unable to remove all updated appointments.');
      console.error(err);
    })
    .then(() => {
      return appointments;
    });
}