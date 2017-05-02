import * as Sequelize from 'sequelize';

/**
 * The options sequelize will use.
 */
let options: Sequelize.Options;

// Set different options depending of the environment (prod or dev)
if(process.env.NODE_ENV == 'prod') {
  // Prod options
  options = {
    host: process.env.BB_DB_HOST,
    port: process.env.BB_DB_PORT,
    dialect: 'mysql',
    pool: {
      max: process.env.BB_DB_MAXPOOL,
      min: process.env.BB_DB_MINPOOL,
      idle: process.env.BB_DB_IDLE
    },
    logging: () => {
      // TODO: use a logger
    }
  }
} else {
  // Dev options
  options = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 1,
      idle: 10000
    }
  }
}

// Common options
options.define = {
  timestamps: false
};

/**
 * The object representing our database.
 */
export let database = new Sequelize(
  process.env.BB_DB_NAME || 'BabelDB',
  process.env.BB_DB_USER || 'borges',
  process.env.BB_DB_PASSWORD || 'devonly',
  options
);

/**
 * The domain's model that will be used to manipulate
 * the database.
 */
export namespace Model {
  // First let's import all schemas created thanks to sequelize-auto
  // Command used:
  // sequelize-auto -o "./models" -d babelDB -h localhost -u root -p 3306 -x <pass> -e mysql
  export let User = database.import('./models/user');
  export let Book = database.import('./models/book');
  export let Borrow = database.import('./models/borrow');
  export let Appointment = database.import('./models/appointment');
  export let Location = database.import('./models/deposit-location');

  // Then complete its associations
  // Borrow has book and user associations (1:n)
  Borrow.belongsTo(User, {foreignKey: 'userId'});
  Borrow.belongsTo(Book, {foreignKey: 'bookId'});
  User.hasMany(Borrow, {foreignKey: 'userId'});
  Book.hasMany(Borrow, {foreignKey: 'bookId'});

  // Book has user (original owner) (1:n)
  Book.belongsTo(User, {foreignKey: 'origin'});
  User.hasMany(Book, {foreignKey: 'origin'});

  // Appointment has user (1:n), borrow (1:n) and location (1:n) associations
  Appointment.belongsTo(User, {foreignKey: 'currentOwnerId'});
  Appointment.belongsTo(Borrow, {foreignKey: 'borrowId'});
  Appointment.belongsTo(Location, {foreignKey: 'depositLocationId'});
  User.hasMany(Appointment, {foreignKey: 'currentOwnerId'});
  Borrow.hasMany(Appointment, {foreignKey: 'borrowId'});
  Location.hasMany(Appointment, {foreignKey: 'depositLocationId'});
}

