const connection = require('../database/connection');

// Criação de chaves e relações entre as mesmas
module.exports = async function create_key(id, sentence,shortcut, id_parent){
    const result = await connection.session.writeTransaction(tx =>
        tx.run(
            `
            MATCH (parent:key) WHERE parent.id = "${id_parent}"
            MERGE (a:key{shortcut:"${shortcut}", id:"${id}"})
            MERGE (a)<-[:especify{sentence:"${sentence}"}]-(parent)

            ` ,
            )        
        );
    
    //const singleRecord = result.records[0];
    //const greeting = singleRecord.get(0);
    console.log("Adicionado!");
}