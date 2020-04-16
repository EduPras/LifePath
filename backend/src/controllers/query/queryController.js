const connection = require('../../database/connection');

// Busca de chaves 

module.exports = {
    async index(request, response){

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH (a:query) 
                MATCH (a)-[:create_by]->(u:user)
                RETURN a.title, u.name
                ` ,
                )        
            );    

        return response.json({"Queries":result.records.map( query =>{  
            return {
                "title":query.get(0),
                "creator":result.records[0].get(1)
            }
        })});

    }


}

