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
// knex 
//   .select('id', 'name')
//   .from('restaurants')
//   .where('cuisine', 'Italian')
//   .whereIn('address_zipcode', ['10012', '10013', '10014'])
//   .limit(5)
//   .orderBy('name', 'asc')
//   .then(console.log);

// 8. Create a restaurant
//  knex
//   .insert({name: 'Byte Cafe', borough: 'Brooklyn', cuisine: 'coffee', address_building_number: '123', address_street: 'Atlantic Ave', address_zipcode:'11231'})
//   .into('restaurants')
//   .then(console.log);

// 9. Create a restaurant and return id and name
// knex
//   .insert({name: 'Krusty Burger', borough: 'Brooklyn', cuisine:'fine dining', address_building_number: '789', address_street: 'Atlantic Ave', address_zipcode: '11231'})
//   .into('restaurants')
//   .returning(['id', 'name'])
//   .then(console.log);

// 10. Create three restaurants and return id and name
// const newRestaurants = [
//   {name: 'Bobs Burgers', borough: 'Brooklyn', cuisine: 'American', address_building_number: '5432', address_street: 'main st', address_zipcode: '11231'},
//   {name: 'Abe\'s Spot', borough: 'Brooklyn', cuisine: 'pub', address_building_number: '2784', address_street: 'somewhere ave', address_zipcode: '11234'},
//   {name: 'Dat\'s Italian!', borough: 'Brooklyn', cuisine: 'Italian', address_building_number: '1235', address_street: 'Another Blvd', address_zipcode: '11236'}
// ];

// knex
// .insert(newRestaurants)
// .into('restaurants')
// .returning(['id', 'name'])
// .then(console.log);

// 11. Update a record
// knex('restaurants')
//   .update('name','DJ Renylolds Pub And Restaurant')
//   .where('nyc_restaurant_id','30191841')
//   .then(console.log);

// 12. Delete by id

// knex
//   .from('restaurants')
//   .where('id','10')
//   .del()
//   .then(console.log);


// 13. a blocked delete
// knex
//   .from('restaurants')
//   .where('id','22')
//   .del()
//   .then(console.log)

const hydrateResults = function(result_set){
  const hydrated = {}

  result_set.forEach(row => {
    if(!(row.id in hydrated)){
      hydrated[row.id]={
        name: row.name,
        cuisine: row.cuisine,
        borough: row.borough,
        grades: []
      };
    }

    hydrated[row.id].grades.push({ 
          gradeId: row.gradeId,
          grade: row.grade,
          score: row.score
        });
 });
  return (hydrated);
};


knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
    .from('restaurants')
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
    .orderBy('date', 'desc')
    .limit(10)
    .debug(false)  
    .then(results => {
      console.log('hydrating...');
      console.log(JSON.stringify(hydrateResults(results), null, 4)); 
      console.log('done!');
    });







// Destroy the connection pool
knex.destroy().then(() => {
  console.log('database connection closed');
});