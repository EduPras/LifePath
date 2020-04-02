const connection = require('../database/connection');

// Criação de famílias
module.exports = async function create_family(name, sentence, id_parent){
    const result = await connection.session.writeTransaction(tx =>
        tx.run(
            `
            MATCH (parent:key) WHERE ID(parent) = ${id_parent}
            MERGE (a:family{name:"${name}"})
            MERGE (a)<-[:especify{sentence:"${sentence}"}]-(parent)

            RETURN ID(a)
            ` ,
            )        
        );    

    console.log(`Family: ID = ${result.records[0].get(0).low}\n\tName = ${name}\nhas been created.\n\n`);
}