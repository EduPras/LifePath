const connection = require('../../database/connection');

module.exports = async (request, response) => {
    const { title } =  request.body;

    const session = connection.driver.session();

    try{
        const result = await session.writeTransaction(tx =>
            tx.run(
                `
                MATCH (search:query{title:"${title}"}) 
                MATCH (search)-[create_by]->(u:user)
                MATCH (search)-[:query_init]->(a:key)
                MATCH (a)-[*]->(c:family)
                RETURN c, u.name, search.description
                ` ,
                )        
            );  
    
        
    
        return response.json(
            {
                "creator": result.records[0].get(1),
                "description":result.records[0].get(2),
                "orders":  result.records.map( query =>{ return {"name":query.get(0).properties.name }})
            }
        )
    }catch(e){
        return
    }finally{
        await session.close();
    }
   
    
}
