const connection = require('../database/connection');

// Análise de uma mudança proposta
module.exports ={
    async index(request, response){

        const { title } = request.body;

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH p = (:key_change{title:"${title}"})-[*]->(end)
                RETURN p
                ` ,
                )        
            );
        
        return response.json(result.records);
        
    },

    async create(request, response){

        const { message, title} = request.body;
        
        // procurar user pelo local storage

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH (a:key_change{title:"${title}"})
                CREATE (a)<-[x:disagree{message:"${message}"}]-(:user{user_login:"edupras"})

                return x.message
                ` ,
                )        
            );
        
        return response.json(result.records);
    }
} 