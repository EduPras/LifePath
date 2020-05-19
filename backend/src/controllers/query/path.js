const driver = require('../../database/connection');

module.exports = async (request, response) => {
    const { order } =  request.query;
    const { parent } = request.body;

    const session = driver.session();

    try{
        const result = await session.writeTransaction(tx =>
            tx.run(
                `
                MATCH(q:query{title:"${parent}"})-[:query_init]->(k:key)
                MATCH p = (k)-[*]->(:order{name:"${order}"})
                RETURN p
                ` ,
                )        
            );    
        
    
        return response.json(result.records[0].get(0).segments.map( x => {
            return x.relationship.properties.sentence
        }));
    }catch(e){
        console.log('[Path] ERROR: '+ e)
    }finally{
        await session.close();
    }

    

}