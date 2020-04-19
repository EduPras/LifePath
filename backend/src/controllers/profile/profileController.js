const connection = require('../../database/connection');

// Mudanças de perfil 

module.exports = {
    async create(request, response){

        const user = request.headers.user;

        const { email, name, new_user_login } =  request.body;

        const result = await connection.session.run( 
            `
            MATCH (p:user)
            WHERE p.user_login = "${new_user_login}"
            RETURN p.user_login
            ` ,
        );    

        if (Array.isArray(result.records) && result.records.length!==0){

            return response.json("Nome de usuário indisponivel");

        }
        else{

            const result = await connection.session.run( 
                `
                MATCH (p:user{user_login:"${user}"})
                SET p.user_login = "${new_user_login}"
                SET p.name = "${name}"
                SET p.email = "${email}"

                RETURN p.user_login
                ` ,
            );

            return response.json(result.records[0].get(0));
        }
    }


}
