const connection = require('../../database/connection');

module.exports = async (request, response) => {
    const result = await connection.session.writeTransaction(tx =>
        tx.run(
            `
            MATCH (a:query) 
            RETURN a.title
            ` ,
            )        
        );    
    
    return response.json({"Queries":result.records.map( query =>{  
        return {
            "title":query.get(0)
        }
    })});
}

