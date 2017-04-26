const knex = require('knex')(DEV);
const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

// clear the console before each run
process.stdout.write('\033c');

// Sample select 
knex.select().from('restaurants')
  .debug(true)
  .then(results => console.log(results));

//1: get all restaurants
knex
  .select()
  .from('restaurants')
  .then(results => console.log(JSON.stringify(results, null, 2)));

//2: get Italin restaurants
knex
  .select()
  .from('restaurants')
  .where('cuisine', 'Italian')
  //or   .where({cuisine: 'Italian'})
  .then(results => console.log(JSON.stringify(results, null, 2)));

//3: get 10 Italian restaurants, subset of fields
knex
  .select('id', 'name')
  .from('restaurants')
  .where('cuisine', 'Italian')
  .limit(10)
  .then(results => console.log(JSON.stringify(results, null, 2)));

//4: count of Thai restaurants
knex
  .count('id')
  .from('restaurants')
  .where('cuisine', 'Thai')
  .then(results => console.log(JSON.stringify(results, null, 2)));

//5: Count of restaurants
knex
  .count('id')
  .from('restaurants')
  .then(results => console.log(JSON.stringify(results, null, 2)));

//6: Count of Thai restaurants in a zip code
knex
  .count('id', 'name', 'borough', 'cuisine')
  .from('restaurants')
  .where('address_zipcode', 11372)
  .andWhere('cuisine', 'Thai')
  .then(results => console.log(JSON.stringify(results, null, 2)));

knex
  .count('id', 'name', 'borough', 'cuisine')
  .from('restaurants')
  .where({ 'address_zipcode': 11372, 'cuisine': 'Thai' })
  .then(results => console.log(JSON.stringify(results, null, 2)));

//7: Italian restaurants in one of several zipcodes
// checkout orWhere

knex.select('id', 'name')
  .from('restaurants')
  .where('cuisine', 'Italian')
  .whereIn('address_zipcode', [10012, 10013, 10014])
  .limit(5)
  .orderBy('name')
  .then(results => console.log(JSON.stringify(results, null, 2)));


//8: Create a restaurant
knex
  .insert({
    name: "Byte Café",
    borough: "Brooklyn",
    cuisine: "coffee",
    address_building_number: '123',
    address_street: 'Atlantic Avenue',
    address_zipcode: '11231'
  })
  .into("restaurants")
  .then(result => console.log(JSON.stringify(result, null, 2)));

// and verify 
knex.select("*")
  .from('restaurants')
  .where('name', 'Byte Café')
  .then(result => console.log(JSON.stringify(result, null, 2)));

//9: Create a restaurant and return id and name
knex
  .insert({
    name: "Ray's Famous Pizza",
    borough: "Brooklyn",
    cuisine: "Pizza",
    address_building_number: '234',
    address_street: 'Awesome Avenue',
    address_zipcode: '11231'
  })
  .returning(['id', 'name'])
  .into('restaurants')
  .then(result => console.log(result));

//10: Create three restaurants and return id and name
knex
  .insert([
    { name: 'Allens Apple', borough: 'Brooklyn', cuisine: 'Seafood', address_street: 'Apple Street', address_building_number: '123', address_zipcode: 11224 },
    { name: 'Bananas Bisto', borough: 'Manhattan', cuisine: 'American', address_street: 'Bananas Street', address_building_number: '456', address_zipcode: 11224 },
    { name: 'Cherry Cafe', borough: 'Bronyx', cuisine: 'Dessert', address_street: 'Cherry Street', address_building_number: '789', address_zipcode: 11224 }
  ])
  .into('restaurants')
  .returning(['id', 'name'])
  .then(results => console.log(JSON.stringify(results, null, 2)));

//11: Update a record
knex('restaurants')
  .update({name:'DJ Reynolds Pub & Restaurant'})
  .where({nyc_restaurant_id: '30191841'})
  .returning(['id', 'name'])
  .then(results => console.log(JSON.stringify(results, null, 2)));

// and verify
knex
  .select('*')
  .from('restaurants')
  .where('nyc_restaurant_id', '30191841')
  .then(record => console.log(JSON.stringify(record, null, 2)));

//12: Delete by id
knex 
  .del()
  .from('grades')
  .where('id', '15')
  .then(res => console.log(JSON.stringify(res, null, 2)));

//13: A blocked delete 
knex
  .del()
  .from(('restaurants'))
  .where({id: 22})
  .returning(['name', 'id'])
  .then(results => console.log(JSON.stringify(results, null, 2)));

// Older Drills (see https://courses.thinkful.com/node-sql-001v1/project/1.1.3)
//14: Create a table
// knex.schema.createTable('inspectors', function(table) {
//   table.text('first_name').notNullable();
//   table.text('last_name').notNullable();
//   table.specificType('borough', 'borough_options');
// }) 
// .then(res => console.log(JSON.stringify(res, null, 2)));

//15: Update grades table
// knex.schema.table('grades', function(table) {
//   table.text('notes');
// });

//16: Drop the table 
// knex.schema
//   .dropTable('inspectors')
//   .then(res => console.log(res));

// HYDRATE drill
const hydrated = {};
restaurants.forEach(row => {
  if (!(row.id in hydrated)) {
    hydrated[row.id] = {
      name: row.name,
      cuisine: row.cuisine,
      borough: row.borough,
      grades: []
    }
  }
  hydrated[row.id].grades.push({
    gradeId: row.gradeId,
    grade: row.grade,
    score: row.score
  });
});
console.log(JSON.stringify(hydrated, null, 2))

// Destroy the connection pool
knex.destroy().then(() => { console.log('closed') })