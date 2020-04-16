const connection = require('../../database/connection');

// Busca de chaves 

module.exports = {
    async index(request, response){

        const { order } =  request.query;
        const { parent } = request.body;

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH p = (:key{shortcut:"${parent}"})-[*]->(:family{name:"${order}"})
                RETURN p
                ` ,
                )        
            );    

        return response.json(result.records[0].get(0).segments.map( x => {
            return x.relationship.properties.sentence
        }));

    }


}