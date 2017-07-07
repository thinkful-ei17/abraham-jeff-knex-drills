'use strict';

const express = require('express');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();

app.get('/restaurants', (req, res) => {
  knex.select('id', 'name', 'cuisine', 'borough')
    .from('restaurants')
    .limit(10)
    .then(results => res.json(results));
});

// ADD ANSWERS HERE

app.listen(PORT);
