import { ID }   from '..';
import { Book } from '..';

export interface Full {
  /**
   * The appointment's unique ID.
   */
  appointmentId: ID;

  /**
   * The borrow object associated to the meeting.
   */
  borrow: Book.Borrowing;

  /**
   * The ID of the user currently owning the
   * book associated to the appointment.
   */
  currentOwnerId: ID;

  /**
   * The associated meeting point.
   */
  depositLocation: Location;
}

export interface Raw {
  /**
   * The appointment's unique ID.
   */
  appointmentId: ID;

  /**
   * The ID of the user currently owning the
   * book associated to the appointment.
   */
  currentOwnerId: ID;

  /**
   * The associated borrow's ID.
   */
  borrowId: ID;

  /**
   * The ID of the meeting point.
   */
  depositLocationId: ID;
}

export interface Location {
  /**
   * The unique ID of the location point.
   */
  depositLocationId: ID;

  /**
   * The type of the location:
   * a coffee house or something.
   */
  depositLocationType: string;

  /**
   * The location's address.
   */
  depositLocationAddress: string;
}