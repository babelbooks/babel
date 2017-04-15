import * as Sequelize from 'sequelize';

let options: Sequelize.Options;

if(process.env.NODE_ENV == 'production') {
  options = {
    host: 'localhost',
    port: process.env.BB_DB_PORT,
    dialect: 'mysql',
    pool: {
      max: process.env.BB_DB_MAXPOOL,
      min: process.env.BB_DB_MINPOOL,
      idle: process.env.BB_DB_IDLE
    }
  }
} else {
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

options.define = {
  timestamps: false
};

export let database = new Sequelize('BabelDB', 'root', 'admin', options);

export namespace Model {
  // First let's import all schemas created thanks to sequelize-auto
  // Command used:
  // sequelize-auto -o "./models" -d babelDB -h localhost -u root -p 3306 -x <pass> -e mysql
  export let User = database.import('./models/user');
  export let Book = database.import('./models/book');
  export let Borrow = database.import('./models/borrow');
  export let Metadata = database.import('./models/bookmetadata');

  // Then complete its associations
  // Borrow has book and user associations (1:n)
  Borrow.belongsTo(User, {foreignKey: 'userId'});
  Borrow.belongsTo(Book, {foreignKey: 'bookId'});
  User.hasMany(Borrow, {foreignKey: 'userId'});
  Book.hasMany(Borrow, {foreignKey: 'bookId'});

  // Book has user (original owner) and bookmetadata association (1:n)
  Book.belongsTo(User, {foreignKey: 'userId'});
  Book.belongsTo(Metadata, {foreignKey: 'bookMetaDataId', as: 'metadata'});
  User.hasMany(Book, {foreignKey: 'bookId'});
  Metadata.hasMany(Book, {foreignKey: 'bookId'});
}

