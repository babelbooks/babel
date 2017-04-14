import * as Sequelize from 'sequelize';

let database = new Sequelize('BabelDB', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 1,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

export namespace Model {
  export let User = database.import('./models/user');
  export let Book = database.import('./models/book');
  export let Borrow = database.import('./models/borrow');
  export let Metadata = database.import('./models/bookmetadata');
}

