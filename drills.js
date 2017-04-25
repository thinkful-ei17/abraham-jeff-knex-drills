
// Require Knex and make connection
const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'dev-restaurants-app'
  },
});

// Sample select 
knex.select('id', 'name', 'borough', 'cuisine')
  .from('restaurants')
  .then(results => console.log(results));