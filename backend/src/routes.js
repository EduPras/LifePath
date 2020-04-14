const express = require('express');

const keyController = require('./controllers/keyController');
const familyController = require('./controllers/familyController');
const queryController = require('./controllers/queryController');
const pushController = require('./controllers/pushController');
const loginController = require('./controllers/loginController');
const changesController = require('./controllers/changesController');
const analyzeController = require('./controllers/analyzeController');


const routes = express.Router();

routes.post('/key', keyController.create);
routes.post('/family', familyController.create);
routes.get('/query', queryController.getShortcuts);
routes.post('/query', queryController.search);
routes.get('/query/search', queryController.path);
routes.post('/user/push', pushController.create);
routes.post('/login', loginController.create);
routes.get('/analyze', changesController.index);
routes.get('/analyze/post', analyzeController.index);
routes.post('/analyze/post', analyzeController.create);

module.exports = routes;
