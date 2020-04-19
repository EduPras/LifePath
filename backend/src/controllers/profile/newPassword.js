const connection = require('../../database/connection');
const hash = require('../../services/hash');

module.exports = {
    async create (request, response){
        const { password, new_password } =  request.body;

        const user = request.headers.user;
    
        const result = await connection.session.run(
                `
                MATCH (u:user{user_login:"${user}"})
                return u.password
                ` ,       
            );   

        console.log(result.records[0].get(0));
                
        if(hash.compare_passwords(password, result.records[0].get(0))){
            const newHashedPassword = await hash.hashed(new_password);
            await connection.session.run(
                `
                MATCH (u:user{user_login:"${user}"})
                SET u.password = "${newHashedPassword}"
                `
            );
            return response.json("0");

        }else{
            return response.json("1")
        }

        

    }
}