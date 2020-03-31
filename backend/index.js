const neo4j = require('neo4j-driver');

// Váriaveis para autenticação com banco de dados
const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "teste";

// Conexão com banco de dados
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

async function connect(){
    const result = await session.writeTransaction(tx =>
        tx.run(
        'CREATE (a:Teste2) SET a.message = $message RETURN a.message + ", from node " + id(a)',
        { message: 'Teste2, teste2' }
        )
        );
    
    
    const singleRecord = result.records[0]
    const greeting = singleRecord.get(0);
    console.log(greeting);  
}


async function quit (){
    await session.close();
    driver.close();
}    

async function run(){
    await connect();
    quit();
}

run();


// on application exit:
    
