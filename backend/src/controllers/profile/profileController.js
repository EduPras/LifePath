const driver = require('../../database/connection');

// Mudanças de perfil 

module.exports = {
    async create(request, response){
        const session = driver.session();

        const user = request.headers.user;

        const { email, name, new_user_login } =  request.body;

        try {
            const result = await session.run( 
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
    
                const result = await session.run( 
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

        } catch (error) {
            console.log('[Profile] ERROR: '+error+'\n---------------------------------------------------')
        }finally{
            await session.close();
        }


    }


}
