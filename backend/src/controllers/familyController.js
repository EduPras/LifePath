const connection = require('../database/connection');

// Criação de famílias
module.exports = {
    async create(request, response){

        const { name, sentence, sc_parent} = request.body;

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH (parent:key) WHERE parent.shortcut = "${sc_parent}"
                MERGE (a:family{name:"${name}"})
                MERGE (a)<-[:especify{sentence:"${sentence}"}]-(parent)
    
                RETURN ID(a.name)
                ` ,
                )        
            );    

        return response.json(result.records[0].get(0).low);

    }


}

