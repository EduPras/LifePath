const connection = require('../database/connection');

// Criação de chaves e relações entre as mesmas
module.exports ={
    async create(request, response){

        const { sentence, shortcut, sc_parent} = request.body;

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH (parent:key) WHERE parent.shortcut = "${sc_parent}"
                MERGE (a:key{shortcut:"${shortcut}"})
                MERGE (a)<-[x:especify{sentence:"${sentence}"}]-(parent)

                RETURN x.sentence
                ` ,
                )        
            );
        
        return response.json({
            "sentence": result.records[0].get(0)
        });
        
    },
} 