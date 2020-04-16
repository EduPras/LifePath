const express = require('express');

const queryController = require('./controllers/query/queryController');
const previewController = require('./controllers/query/previewController');
const pathController = require('./controllers/query/pathController');
const pushController = require('./controllers/profile/pushController');
const myQueriesController = require('./controllers/profile/myQueriesController');
const loginController = require('./controllers/home/loginController');



const routes = express.Router();

// query page
routes.get('/query', queryController.index);
routes.get('/query/preview', previewController.index);
routes.get('/query/preview/path', pathController.index);

// profile page
routes.post('/profile/push', pushController.create);
routes.get('/profile/queries', myQueriesController.index );

// home
routes.post('/', loginController.create);


module.exports = routes;
