const connection = require('../database/connection');

// Criação de famílias
module.exports = async function create_family(name, sentence, id_parent){
    const result = await connection.session.writeTransaction(tx =>
        tx.run(
            `
            MATCH (parent:key) WHERE parent.id = "${id_parent}"
            MERGE (a:family{name:"${name}"})
            MERGE (a)<-[:especify{sentence:"${sentence}"}]-(parent)

            ` ,
            )        
        );    

    console.log("Adicionado!");
}