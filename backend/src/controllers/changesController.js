const connection = require('../database/connection');

// Listagem das mudanças propostas por outros analistas
module.exports ={
    async index(request, response){

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH (x:key_change)
                RETURN x
                ` ,
                )        
            );
        
        return response.json(result.records.map( change =>{
            return {
                "Title": change.get(0).properties.title,
                "Description": change.get(0).properties.description
                }
        }));
        
    },
} 