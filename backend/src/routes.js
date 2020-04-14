const express = require('express');

const keyController = require('./controllers/keyController');
const familyController = require('./controllers/familyController');
const queryController = require('./controllers/queryController');
const pushController = require('./controllers/pushController');
const loginController = require('./controllers/loginController');
const routes = express.Router();

routes.post('/key', keyController.create);
routes.post('/family', familyController.create);
routes.get('/query', queryController.getShortcuts);
routes.post('/query', queryController.search);
routes.get('/query/search', queryController.path);
routes.post('/user/push', pushController.create);
routes.post('/login', loginController.create);

module.exports = routes;
