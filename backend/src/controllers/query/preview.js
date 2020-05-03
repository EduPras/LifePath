const connection = require('../../database/connection');

module.exports = async (request, response) => {
    const { title } =  request.body;

    const result = await connection.session.writeTransaction(tx =>
        tx.run(
            `
            MATCH (search:query{title:"${title}"}) 
            MATCH (search)-[:query_init]->(a:key)
            MATCH (a)-[*]->(c:family)
            RETURN c
            ` ,
            )        
        );    

    return response.json({"Result":result.records.map( query =>{  
        return query.get(0).properties.name;
    })});
}