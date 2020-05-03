const express = require('express');

const queryController = require('./controllers/query/queryController');
const previewController = require('./controllers/query/previewController');
const pathController = require('./controllers/query/pathController');
const pushController = require('./controllers/profile/pushController');
const myQueriesController = require('./controllers/profile/myQueriesController');
const postController = require('./controllers/home/postController');
const profileController = require('./controllers/profile/profileController');
const newPassword = require('./controllers/profile/newPassword');

const routes = express.Router();

// query page
routes.get('/query', queryController.index);

// profile page
routes.post('/profile/push', pushController.create);
routes.get('/profile/queries', myQueriesController.index );
routes.post('/profile', profileController.create);
routes.post('/profile/newPassword', newPassword.create)

// home
routes.post('/', postController.create);


module.exports = routes;
