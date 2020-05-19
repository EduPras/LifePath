const driver = require('../../database/connection');

// Adicionar uma chave para ser analisada
module.exports ={
    async create(request, response){
        const session = driver.session();

        const queries = request.body;

        const user =  request.headers.user;


        try {

            await session.writeTransaction(async tx=>{
                await tx.run(
                    `
                    MATCH (u:user{user_login:"${user}"})
                    MERGE (new:query{ title:"${queries.title}", description:"${queries.description}"})
                    MERGE (new)-[:create_by]->(u)
                    MERGE (a:key{shortcut:"${queries.shortcut}"})
                    MERGE (a)<-[:query_init]-(new)

                    return a, new
                    `
                )

    
                queries.keys.map(async key=>{
                    if(key.type==='key'){
                        var x = await tx.run(
                            `
                            MATCH (parent:key) WHERE parent.shortcut = "${key.sc_parent}"
                            MERGE (a:key{shortcut:"${key.shortcut}"})
                            MERGE (a)<-[x:especify{sentence:"${key.sentence}"}]-(parent)
                            return a, parent
                            `
                        )
                    }
                    if(key.type==='family'){
                        var x = await tx.run(
                            `
                            MATCH (parent:key) WHERE parent.shortcut = "${key.sc_parent}"
                            MERGE (a:family{name:"${key.name}"})
                            MERGE (a)<-[x:especify{sentence:"${key.sentence}"}]-(parent)
                            return a, parent
                            `
                        );
                    }
                })
                return response.json({"message":"adicionado"})
            })
        } catch (error) {
            console.log('ERRO:'+error+'\n-----------------------------------------------------------------')
        }finally{
            await session.close();
        }       
    }
}
