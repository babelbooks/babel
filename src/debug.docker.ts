import * as mysql   from 'mysql';
import 'colors';

let co = mysql.createConnection({
  host     : process.env.BB_DB_HOST || 'localhost',
  port     : process.env.BB_DB_PORT || 3306,
  user     : process.env.BB_DB_USER || 'borges',
  password : process.env.BB_DB_PASS || 'devonly',
  database : process.env.BB_DB_NAME || 'babeldb',
});

export function run() {
  console.log('DEBUG'.yellow + ' Printing env variables...');
  console.log('DEBUG'.yellow + ' NODE_ENV\t\t= '.cyan + process.env.NODE_ENV);
  console.log('DEBUG'.yellow + ' BB_DB_NAME\t\t= '.cyan + process.env.BB_DB_NAME);
  console.log('DEBUG'.yellow + ' BB_DB_HOST\t\t= '.cyan + process.env.BB_DB_HOST);
  console.log('DEBUG'.yellow + ' BB_DB_PORT\t\t= '.cyan + process.env.BB_DB_PORT);
  console.log('DEBUG'.yellow + ' BB_DB_MAXPOOL\t= '.cyan + process.env.BB_DB_MAXPOOL);
  console.log('DEBUG'.yellow + ' BB_DB_MINPOOL\t= '.cyan + process.env.BB_DB_MINPOOL);
  console.log('DEBUG'.yellow + ' BB_DB_IDLE\t\t= '.cyan + process.env.BB_DB_IDLE);

  console.log('DEBUG'.yellow + ' Setting db connection test...');
  setTimeout(() => {
    console.log('DEBUG'.yellow + ' Connecting...');
    co.connect();
    console.log('DEBUG'.yellow + ' Querying...');
    co.query('select * from User;', (error: any, results: any, fields: any) => {
      if(error) {
        console.log('ERROR'.red + ' Error during database access test'.red);
        console.log('ERROR'.red, error);
      } else {
        console.log('INFO'.cyan + ' Database access test successful.'.green);
      }
    });
    console.log('DEBUG'.yellow + ' Disconnecting...');
    co.end();
  }, 20000);
  console.log('DEBUG'.yellow + ' Connection test will run in 20 seconds.');
}
