const connection = require('../database/connection');

// Adicionar uma chave para ser analisada
module.exports ={
    async create(request, response){
        const queries = request.body;

        await connection.session.writeTransaction(async tx=>{
            await tx.run(
                `
                MATCH (parent:key) WHERE parent.shortcut = "${queries.key_parent}"
                MERGE (a:key{shortcut:"${queries.shortcut}"})
                MERGE (a)<-[x:especify{sentence:"${queries.sentence}"}]-(parent)
                `
            )

            queries.keys.map(async key=>{
                if(key.type==='key'){
                    await tx.run(
                        `
                        MATCH (parent:key) WHERE parent.shortcut = "${key.sc_parent}"
                        MERGE (a:key{shortcut:"${key.shortcut}"})
                        MERGE (a)<-[x:especify{sentence:"${key.sentence}"}]-(parent)
                        `
                    )
                }
                if(key.type==='family'){
                    await tx.run(
                        `
                        MATCH (parent:key) WHERE parent.shortcut = "${key.sc_parent}"
                        MERGE (a:family{name:"${key.name}"})
                        MERGE (a)<-[x:especify{sentence:"${key.sentence}"}]-(parent)
                        `
                    )
                }
            })
            return response.json({"message":"adicionado"})
        })

        await connection.session.close();
        
    }
}
