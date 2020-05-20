const neo4j = require('neo4j-driver');
require('dotenv').config();

const driver =  neo4j.driver(process.env.APP_URI, neo4j.auth.basic(process.env.USER, process.env.PASSWORD));

module.exports = driver;
