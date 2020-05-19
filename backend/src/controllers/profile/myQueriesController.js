const driver = require('../../database/connection');

// Listagem das queries criadas pelo usuário

module.exports = {
    async index(request, response){

        const user  =  request.headers.user;

        const session = driver.session();

        try{
            
            const result = await session.writeTransaction(tx =>
                tx.run(
                    `
                    match(u:user{user_login:"${user}"})
                    match (u)<-[:create_by]-(x:query)
                    return x
                    ` ,
                    )        
                );    

            return response.json(result.records.map( result => {
                return{
                    "title": result.get(0).properties.title,
                    "description":  result.get(0).properties.description
                }
            }));
        }catch(error){
            console.log('[MyQueries] ERROR: '+error)
        }finally{
            await session.close();
        }
    }
}
