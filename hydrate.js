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
  });


// Destroy the connection pool
knex.destroy().then(() => { console.log('closed') })