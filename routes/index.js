/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { pool } = require('../pgconnect');

const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/gifs', gifRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/feed', feedsRoute);

module.exports = router;
