const neo4j = require('neo4j-driver');

// Váriaveis para autenticação com banco de dados
const uri= "bolt://localhost:7687";
const user =  "neo4j";
const password = "lifepath";

// Conexão com banco de dados
const driver =  neo4j.driver(uri, neo4j.auth.basic(user, password));
const session =  driver.session();


module.exports={ driver, session };
