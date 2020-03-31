const neo4j = require('neo4j-driver');

// Váriaveis para autenticação com banco de dados
const uri = "bolt://localhost:7687";
const user = "neo4j";
const password = "lifepath";


// Conexão com banco de dados
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();


// Criação de chaves e relações entre as mesmas
async function create_key(id, sentence,shorthcut, id_parent){
    const result = await session.writeTransaction(tx =>
        tx.run(
            `
            MATCH (parent:key) WHERE parent.id = "${id_parent}"
            CREATE (a:key{shortcut:"${shorthcut}", id:"${id}"})
            CREATE (a)<-[:especify{sentence:"${sentence}"}]-(parent)

            RETURN a.shortchut
            ` ,
        )        
        );
    
    const singleRecord = result.records[0];
    //const greeting = singleRecord.get(0);
    console.log(singleRecord);  
}


async function quit (){
    await session.close();
    driver.close();
}    


async function run(){
    /*
    Necessário uma chave inicial com id="0" no banco de dados(por enquanto)
    Alguns exemplos:
    */
    await create_key("1", "com apêndices locomotores rudimentares no abdômen; ápteros; ametábolos","Subclasse Apterygota","0" );
    await create_key("2", "sem apêndices locomotores no abdômen; com ou sem asas; metábolos","Subclasse Pterygota","0" );
    await create_key("2*", "com antenas","Com antenas","1" );
    await create_key("3", "ápice do abdômen com fúrcula, raramente ausente; antenas com 4 a 6 artículos; corpo geralmente recoberto com escamas","Abdomen com fúrcula","2*" );
    await create_key("3*", " ápice do abdômen com 2 ou 3 filamentos (2 cercos e 1 filamento caudal mediano)","Abdomen com 2 ou 3 filamentos","2*" );
    
    quit();
}


run();

    
