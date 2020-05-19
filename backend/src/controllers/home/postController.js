const login = require('./login');
const register = require('./register')

// Criptografia de login e senha

module.exports = {
    async create(request, response){

        const { type } = request.body;

        if(type === "login"){
            login(request, response);
           
        }
        else if(type ==="register"){
            register(request, response);
        }
    }
}

