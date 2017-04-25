const express = require('express');
const bodyParser = require('body-parser');

const { DEV } = require('./config');
const knex = require('knex')(DEV);

const app = express();
app.use(bodyParser.json());

app.get('/restaurants', (req, res) => {

  knex.select('id', 'name', 'cuisine', 'borough')
    .from('restaurants')
    .limit(10)
    .then(results => res.json(results));
});

app.listen(process.env.PORT || 8080);