const connection = require('../../database/connection');
const path = require('./path');
const preview = require('./preview');
const query = require('./query')

// Busca de chaves 

module.exports = {
    async index(request, response){

        const { type } = request.body;

        if(type==='query'){
            query(request, response);
        }
        else if( type === 'preview'){
            preview(request, response)
        }
        else if( type === 'path'){
            path(request, response);
        }

    }


}

