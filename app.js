/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable no-redeclare */
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/user');
const gifRoutes = require('./Routes/gifs');
const articleRoutes = require('./Routes/articles');
const feedsRoute = require('./Routes/feed');

const app = express();

// eslint-disable-next-line no-var
var cloudinary = require('cloudinary');

// eslint-disable-next-line no-var
var cloudinary = require('cloudinary').v2;

cloudinary.uploader.upload('my_image.jpg', (error, result) => { console.log(result, error);});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/gifs', gifRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/feed', feedsRoute);

module.exports = app;



