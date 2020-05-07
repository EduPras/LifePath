const connection = require('../../database/connection');

module.exports = async (request, response) => {
    const { order } =  request.query;
    const { parent } = request.body;

    const result = await connection.session.writeTransaction(tx =>
        tx.run(
            `
            MATCH(q:query{title:"${parent}"})-[:query_init]->(k:key)
            MATCH p = (k)-[*]->(:family{name:"${order}"})
            RETURN p
            ` ,
            )        
        );    

    return response.json(result.records[0].get(0).segments.map( x => {
        return x.relationship.properties.sentence
    }));

}