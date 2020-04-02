const connection = require('../database/connection');

// Criação de chaves e relações entre as mesmas
module.exports = async function create_key(sentence,shortcut, id_parent){
    const result = await connection.session.writeTransaction(tx =>
        tx.run(
            `
            MATCH (parent:key) WHERE ID(parent) = ${id_parent}
            MERGE (a:key{shortcut:"${shortcut}"})
            MERGE (a)<-[:especify{sentence:"${sentence}"}]-(parent)

            RETURN ID(a)
            ` ,
            )        
        );
    
    //const singleRecord = result.records[0];
    //const greeting = singleRecord.get(0);
    //console.log("Adicionado!");
    console.log(`Key: \tID = ${result.records[0].get(0).low}\n\tShortcut = ${shortcut}\nhas been created.\n\n`);
    return result.records[0].get(0).low;

}