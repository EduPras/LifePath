const bcrypt = require('bcrypt');

module.exports= {
    async hashed(password){
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    },

    async compare_passwords(password, true_password){
        if (await bcrypt.compare(password, true_password)){
            return true
        }else{
            return false
        }
    }
}