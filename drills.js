'use strict';

const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\x1Bc');

// Sample select 
// knex
//   .select()
//   .from('restaurants')
//   .limit(2)
//   .debug(true)
//   .then(results => console.log(results));


// 1. Get all restaurants
// knex 
//   .select()
//   .from('restaurants')
//   .then(console.log);

// 2. Get Italian restaurants
// knex 
//   .select()
//   .from('restaurants')
//   .where('cuisine', 'Italian')
//   .then(console.log);

// 3. Get 10 Italian restaurants, subset of fields
// knex
//   .select('id', 'name')
//   .from('restaurants')
//   .where('cuisine', 'Italian')
//   .limit(10)
//   .then(console.log);

// 4. Count of Thai restaurants
// knex 
//   .count()
//   .from('restaurants')
//   .where('cuisine', 'Thai')
//   .then(console.log);

// 5. Count of restaurants
// knex
//   .count()
//   .from('restaurants')
//   .then(console.log);

// 6. Count of Thai restaurants in zip code
// knex 
//   .count()
//   .from('restaurants')
//   .where('cuisine', 'Thai')
//   .andWhere('address_zipcode', '11372')
//   .then(console.log);

// 7. Italian restaurants in one of several zip codes
knex 
  .select('id', 'name')
  .from('restaurants')
  .where('cuisine', 'Italian')
  .whereIn('address_zipcode', ['10012', '10013', '10014'])
  .limit(5)
  .orderBy('name', 'asc')
  .then(console.log);


// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});