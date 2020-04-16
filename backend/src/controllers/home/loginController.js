const connection = require('../../database/connection');
const bcrypt = require('bcrypt');

// Criptografia de login e senha

module.exports = {
    async create(request, response){

        try {
            const { user, password } = request.body;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const result = await connection.session.writeTransaction(tx =>
                tx.run(
                    `
                    MATCH (u:user{user_login:"${user}"})
                    return u.password
                    ` ,
                    )        
                );   
    

            const true_password = result.records[0].get(0); 

            if( await bcrypt.compare(password, true_password)){
                return response.json("0")
            }
            else{
                console.log(hashedPassword);
                console.log(true_password);
                return response.json("1")
            }

        } catch (error) {
            console.log(error)
        }



    }


}

