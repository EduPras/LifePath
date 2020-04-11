const connection = require('../database/connection');

// Receber atalhos dos nós para usar na pesquisa
module.exports ={
    async getShortcuts(request, response){

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH(a:key)
                RETURN a.shortcut
                ` ,
                )        
            );
        
        return response.json(result.records.map(x => x.get(0)));
        
    },

    async search(request, response){

        const { shortcut } = request.body;

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH p =(begin)-[*]->(a:family)
                WHERE begin.shortcut = "${shortcut}"    
                return a
             ` ,
                )        
            );
        
        return response.json(result.records.map(x => x.get(0).properties.name));
        
    },

    async path(request, response){

        const { family_name } = request.query;

        const result = await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MATCH p =(begin)-[*]->(a:family{name:"${family_name}"})
                return p
             ` ,
                )        
            );
        
        return response.json(result.records.map(x => x.get(0).segments[0].relationship.properties.sentence));
        
    }
    
} 