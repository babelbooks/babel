import * as mysql     from 'mysql';
import * as Bluebird  from 'bluebird';

let options: mysql.IPoolConfig;

if(process.env.NODE_ENV == 'production') {
  options = {
    connectionLimit: process.env.BB_DB_CO_LIM,
    host: 'localhost',
    user: process.env.BB_DB_USER,
    password: process.env.BB_DB_PASS,
    database: process.env.BB_DB_NAME
  };
} else {
  options = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'bbtests'
  };
}

const pool = mysql.createPool(options);

function getConnection(): Bluebird<mysql.IConnection> {
  return new Bluebird((resolve: (...params: any[]) => any, reject: (...params: any[]) => any) => {
    pool.getConnection((err: Error, connection: mysql.IConnection) => {
      if(err) {
        return reject(err);
      }
      return resolve(connection);
    });
  });
}

export function getAllUsers(): Bluebird<any> {
  return new Bluebird((resolve: (...params: any[]) => any, reject: (...params: any[]) => any) => {
    pool.query('select * from users', (err, res) => {
      if(err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}