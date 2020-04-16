const connection = require('../../database/connection');

// Listagem das queries criadas pelo usuário

module.exports = {
    async index(request, response){

        const user  =  request.headers.user;
        

        const result = await connection.session.writeTransaction(tx =>
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

    }


}
