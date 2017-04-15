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

let database = new Sequelize('BabelDB', 'root', 'admin', options);

export namespace Model {
  export let User = database.import('./models/user');
  export let Book = database.import('./models/book');
  export let Borrow = database.import('./models/borrow');
  export let Metadata = database.import('./models/bookmetadata');
}

