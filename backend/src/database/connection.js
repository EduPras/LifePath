const neo4j = require('neo4j-driver');
require('dotenv').config();

const driver =  neo4j.driver(process.env.APP_URI_GRAPHENEDB, neo4j.auth.basic(process.env.USER_GRAPHENEDB, process.env.PASSWORD_GRAPHENEDB),{ encrypted : true});
module.exports = driver;
