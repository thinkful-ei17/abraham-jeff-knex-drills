// clear the console before each run
process.stdout.write('\033c');

// Require Knex and make connection
const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'dev-restaurants-app'
  },
});

// If you're using ElephantSQL then the connection will look like this
/*
const knex = require('knex')({
  client: 'pg',
  connection:'postgres://USERNAME:PASSWORD@stampy.db.elephantsql.com:5432/USERNAME'
}
*/

// Sample select 
knex.select('id', 'name', 'borough', 'cuisine')
    .from('restaurants')
    .then(results => console.log(results));