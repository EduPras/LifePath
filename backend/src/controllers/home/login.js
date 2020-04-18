const connection = require('../../database/connection');
const hash = require('./hash')

module.exports = async (request, response)=>{
    try {
        const { user, password } = request.body;
    
        const hashedPassword = hash.hashed(password);
    
        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH (u:user{user_login:"${user}"})
                return u.password
                ` ,
                )        
            );   
    
    
        const true_password = result.records[0].get(0); 

        const compare = hash.compare_passwords(password, true_password);
    
        if(compare){
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

