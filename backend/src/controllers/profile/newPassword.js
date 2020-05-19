const driver = require('../../database/connection');
const hash = require('../../services/hash');

module.exports = {
    async create (request, response){
        const session = driver.session();

        const { password, new_password } =  request.body;

        const user = request.headers.user;

        try {
            const result = await session.run(
                `
                MATCH (u:user{user_login:"${user}"})
                return u.password
                ` ,       
            );   
                
            if(hash.compare_passwords(password, result.records[0].get(0))){
                const newHashedPassword = await hash.hashed(new_password);
                await session.run(
                    `
                    MATCH (u:user{user_login:"${user}"})
                    SET u.password = "${newHashedPassword}"
                    `
                );
                return response.json("0");

            }else{
                return response.json("1")
            }
                
        } catch (error) {
            console.log('[NewPassword] ERROR: '+error)
        }finally{
            await session.close();
        }
    


        

    }
}