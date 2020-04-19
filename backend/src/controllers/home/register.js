const connection = require('../../database/connection');
const hash = require('../../services/hash');

// Registro de novo usuário

module.exports = 
    async (request, response) => {

        const { user_login, name, email, password} = request.body;

        const result = await connection.session.run( 
            `
            MATCH (p:user)
            WHERE p.user_login = "${user_login}"
            RETURN p.user_login
            ` ,
            );    

        if (Array.isArray(result.records) && result.records.length!==0){
            return response.json("Usuário indisponivel");
        }
        else{
            const Hpassword = await hash.hashed(password);

            await connection.session.run(
                `
                MERGE (a:user{
                    name:"${name}",
                    email:"${email}",
                    password:"${Hpassword}",
                    user_login:"${user_login}"
                    
                })`
            );
            return response.json("Adicionado")
        }
        
       

    }
