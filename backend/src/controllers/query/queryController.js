const path = require('./path');
const preview = require('./preview');
const query = require('./query');
const find = require('./find');

// Busca de chaves 

module.exports = {
    async index(request, response){

        const { type } = request.body;

        if(type==='query'){
            await query(request, response);
        }
        else if( type === 'preview'){
            await preview(request, response)
        }
        else if( type === 'path'){
            await path(request, response);
        }
        else if( type === 'find'){
            await find(request, response);
        }

    }


}

