// clear the console before each run
process.stdout.write('\033c');

const knex = require('knex')({
  client: 'pg',
  connection: 'postgresql://dev:dev@localhost/dev-restaurants-app',
  debug: false
});

knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
  .from('restaurants')
  .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
  .orderBy('date', 'asc')
  .limit(10)
  .then(results => {

    // naive approach
    const hydrated = {};
    results.forEach(row => {
      if (!(row.id in hydrated)) {
        hydrated[row.id] = {
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
    console.log(JSON.stringify(hydrated, null, 2));

    // sophisticated approach
    const raw_data = people;
    const results = [], lookup = {};
    for (let thing of raw_data) {
      if (!lookup[thing.id]) {
        lookup[thing.id] = {
          id: thing.id,
          name: thing.name,
          age: thing.age,
          pets: []
        };
        results.push(lookup[thing.id]);
      }

      lookup[thing.id].pets.push({
        petName: thing.petName,
        petType: thing.petType
      });
    }
    console.log(JSON.stringify(results, null, 2))


  });


// Destroy the connection pool
knex.destroy().then(() => { console.log('closed') })