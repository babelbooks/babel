import * as express     from 'express';
import * as OMApps      from './appointment.bo';
import { Appointment }  from '../lib';
import { Authorized }   from '../auth/auth.middlewares';

/**
 * The router associated to books.
 * Configured hereinafter.
 * @type {Router}
 */
export let router: express.Router = express.Router();

/**
 * GET /test
 *
 * To test if the book router is working.
 * Returns a 200 status code and a small json object if working.
 */
router.get('/test', (req: express.Request, res: express.Response) => {
  return res
    .status(200)
    .json({
      endpoint: req.originalUrl,
      status: 200,
      comment: 'it\'s working!'
    });
});

/**
 * GET /meeting/:appointmentId
 *
 * Returns an Appointment.Raw object as json if the request was correct.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/meeting/:appointmentId', (req: express.Request, res: express.Response) => {
  return OMApps
    .getAppointmentById(req.params['appointmentId'])
    .then((appointment: Appointment.Raw) => {
      return res
        .status(200)
        .json(appointment);
    })
    .catch((err: Error) => {
      return res
        .status(400)
        .json(err);
    });
});

/**
 * GET /location/:locationId
 *
 * Returns an Appointment.Location object as json if the request was correct.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/location/:locationId', (req: express.Request, res: express.Response) => {
  return OMApps
    .getLocationById(req.params['locationId'])
    .then((loc: Appointment.Location) => {
      return res
        .status(200)
        .json(loc);
    })
    .catch((err: Error) => {
      return res
        .status(400)
        .json(err);
    });
});

/**
 * GET /user/me/for
 *
 * Returns an array of Appointment.Full objects as json if the request was correct.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/user/me/for', (req: express.Request, res: express.Response) => {
  return OMApps
    .getAppointmentsForUser(req.session.passport.user.username)
    .then((appointments: Appointment.Full[]) => {
      return res
        .status(200)
        .json(appointments);
    })
    .catch((err: Error) => {
      return res
        .status(400)
        .json(err);
    });
});

/**
 * GET /user/me/with
 *
 * Returns an array of Appointment.Full objects as json if the request was correct.
 * Returns a 400 BAD REQUEST along with a json object describing
 * the error if there was an error.
 */
router.get('/user/me/with', (req: express.Request, res: express.Response) => {
  return OMApps
    .getAppointmentsWithUser(req.session.passport.user.username)
    .then((appointments: Appointment.Full[]) => {
      return res
        .status(200)
        .json(appointments);
    })
    .catch((err: Error) => {
      return res
        .status(400)
        .json(err);
    });
});

/**
 * PUT /meeting/add
 * meeting: Appointment.Full
 *
 * Tries to create an appointment from the given object,
 * and returns a 201 CREATED status if successful.
 * Otherwise, returns a 400 BAD REQUEST along with a json object
 * describing the error.
 */
router.put('/meeting/add', (req: express.Request, res: express.Response) => {
  if(!req.body.meeting) {
    return res.status(400).json(new Error(
      'Missing "meeting" parameter in request body.'
    ));
  }
  return OMApps
    .addAppointment(req.body.meeting)
    .then((app: Appointment.Raw) => {
      return res.status(201).json(app);
    })
    .catch((err: Error) => {
      return res.status(400).json(err);
    });
});

/**
 * The paths this router consider as free to query
 * without any authentication.
 * @type {[Authorized]}
 */
export const noNeedToCheck: Authorized[] = [
  {
    path: '/test'
  }];