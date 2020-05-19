const driver = require('../../database/connection');

module.exports = async (request, response) => {

    const session = driver.session();

    try{
        const result = await session.writeTransaction(tx =>
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
    }catch(e){
        console.log('[Query] ERROR: '+e)
    }finally{
        await session.close();
    }
    
}

