const driver = require('../../database/connection');
const hash = require('../../services/hash')

module.exports = async (request, response)=>{
    const session = driver.session();

    try {
    
        const { user, password } = request.body;
    
        const result = await session.writeTransaction(tx =>
            tx.run(
                `
                MATCH (u:user{user_login:"${user}"})
                return u.password
                ` ,
                )        
            );   
    
    
        const true_password =  result.records[0].get(0); 

        const compare = await hash.compare_passwords(password, true_password);
    
        if(compare){
            return response.json("0")
        }
        else{
            return response.json("1")
        }
    
    } catch (error) {
        console.log('[Login] ERROR: '+error)
    } finally {
        await session.close();
    }
    
}

