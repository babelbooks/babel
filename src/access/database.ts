import * as mysql     from 'mysql';
import * as Bluebird  from 'bluebird';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'bbtests'
});

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