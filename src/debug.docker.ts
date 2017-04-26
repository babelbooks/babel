import * as mysql   from 'mysql';
import 'colors';

let co = mysql.createConnection({
  host     : process.env.BB_DB_HOST,
  port     : process.env.BB_DB_PORT,
  user     : 'borges',
  password : 'devonly',
  database : 'BabelDB'
});

export function run() {
  console.log('DEBUG'.yellow + ' Printing env variables...');
  console.log('DEBUG'.yellow + ' BB_DB_HOST\t= '.cyan + process.env.BB_DB_HOST);
  console.log('DEBUG'.yellow + ' BB_DB_PORT\t= '.cyan + process.env.BB_DB_PORT);
  console.log('DEBUG'.yellow + ' BB_DB_MAXPOOL\t= '.cyan + process.env.BB_DB_MAXPOOL);
  console.log('DEBUG'.yellow + ' BB_DB_MINPOOL\t= '.cyan + process.env.BB_DB_MINPOOL);
  console.log('DEBUG'.yellow + ' BB_DB_IDLE\t= '.cyan + process.env.BB_DB_IDLE);

  console.log('DEBUG'.yellow + ' Setting db connection test...');
  let i = 0;
  setInterval(() => {
    co.connect();
    co.query('show tables;', (error: any, results: any, fields: any) => {
      if(error) {
        console.log('ERROR'.red + ' Error during database access test'.red);
        console.log('ERROR'.red, error);
      } else {
        console.log('INFO'.cyan + ' Database access test ' + ++i + ' successful.'.green);
      }
    })
  }, 10000);
  console.log('DEBUG'.yellow + ' Connection test will run every 10 seconds.');
}
