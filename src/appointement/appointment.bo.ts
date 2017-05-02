import * as Bluebird    from 'bluebird';
import * as services    from './appointment.access';
import { Appointment }  from '../lib';
import { ID }           from '../lib';
import 'colors';

/**
 * Returns the appointment identified by the given ID.
 * If no appointment exists with the given ID, returns
 * an undefined object.
 * @param id The ID of the appointment to retrieve.
 * @returns {Bluebird<Appointment.Raw>}
 */
export function getAppointmentById(id: ID): Bluebird<Appointment.Raw> {
  return services.getAppointmentById(id);
}

/**
 * Returns the appointment identified by the given ID.
 * If no appointment exists with the given ID, returns
 * an undefined object.
 * @param id The ID of the location to retrieve.
 * @returns {Bluebird<Appointment.Location>}
 */
export function getLocationById(id: ID): Bluebird<Appointment.Location> {
  return services.getLocationById(id);
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
 * Adds an appointment to the database,
 * and the associated location id needed.
 * If there was a problem with the request,
 * returns a promise rejection.
 * Otherwise, returns the created raw Appointment.
 * @param meeting The meeting to insert.
 * @returns {Bluebird<Appointment.Raw>}
 */
export function addAppointment(meeting: Appointment.Full): Bluebird<Appointment.Raw> {
  let loc = meeting.depositLocation;
  let borrow = meeting.borrow;
  let meet: Appointment.Raw = {
    appointmentId: undefined,
    currentOwnerId: meeting.currentOwnerId,
    borrowId: borrow.borrowId,
    depositLocationId: undefined
  };
  return Bluebird
    .try(() => {
      if(loc.depositLocationId !== undefined) {
        return services.addLocation(loc);
      }
      return loc;
    })
    .catch((err: Error) => {
      return Bluebird.reject(new Error('Unable to insert location: ' + err));
    })
    .then((location: Appointment.Location) => {
      meet.depositLocationId = location.depositLocationId;
      return services.addAppointment(meet);
    })
    .catch((err: Error) => {
      return Bluebird.reject(new Error('Unable to insert appointment: ' + err));
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