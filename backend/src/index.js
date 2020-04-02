const connection = require('./database/connection');
const express = require('express');
const routes = require('./routes');

// Conexão com web
const app = express();
app.use(express.json());
app.use(routes);
app.listen(3333);

