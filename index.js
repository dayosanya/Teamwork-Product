/* eslint-disable import/no-unresolved */
const express = require('express');

const router = express.Router();
const { auth } = require('../Middleware/auth');

const articleCtrl = require('../controllers/articles');

// ARTICLES ROUTES

router.post('/post', auth, articleCtrl.createArticle);
router.patch('/:id', auth, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteOneArticle);
router.post('/:id/comment', auth, articleCtrl.createComment);
router.delete('/:id/comment/:id', auth, articleCtrl.deleteComment);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.patch('/:id/flag', auth, articleCtrl.markInappropriate);

const feedCtrl = require('../controllers/feed');
router.get('/', auth, feedCtrl.feeds);

const gifCtrl = require('../controllers/gifs');

// GIFS ROUTES
router.post('/upload', auth, gifCtrl.createGif);
router.delete('/:id', auth, gifCtrl.deleteOneGif);
router.post('/:id/comment', auth, gifCtrl.createComment);
router.delete('/:id/comment/:id', auth, gifCtrl.deleteComment);
router.get('/:id', auth, gifCtrl.getOneGif);

const userCtrl = require('../controllers/user');

// USERS ROUTES

router.post('/create-user', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/user/:id', auth, userCtrl.deleteUser);
router.patch('/user/:id', auth, userCtrl.updateUser);
router.get('/user/:id', auth, userCtrl.getOneUser);

module.exports = router;