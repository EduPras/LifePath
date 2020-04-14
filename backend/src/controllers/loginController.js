const connection = require('../database/connection');

// Criação de chaves e relações entre as mesmas
module.exports ={
    async create(request, response){

        const { user_login, password } = request.body;

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MERGE (a:User{user_login:"${user_login}", password:"${password}"})
                ` ,
                )        
            );
        
        return response.json({"message":"Adicionado" });
        
    },
} 