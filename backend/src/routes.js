const express = require('express');

const keyController = require('./controllers/keyController');
const familyController = require('./controllers/familyController');

const routes = express.Router();

routes.post('/key', keyController.create);
routes.post('/family', familyController.create);

module.exports = routes;
