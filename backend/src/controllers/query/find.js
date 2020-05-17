const connection = require('../../database/connection');

module.exports = async (request, response) =>{

    const { parent, first } = request.body;


    const session = connection.driver.session();

    try {
        
        if (first){
            const result = await session.writeTransaction( tx =>
                tx.run(
                    `MATCH(:key{shortcut:"${parent}"})-[s:especify]->()
                    RETURN s`
                )
            )

            response.json({
                "key_1": result.records[0].get(0).properties.sentence,
                "key_2": result.records[1].get(0).properties.sentence
            })
        }else{
            const result = await session.writeTransaction( tx =>
                tx.run(
                    `MATCH (:key)-[:especify{sentence:'${parent}'}]->(a)
                     RETURN a.shortcut`
                )              
            )

            const session1 = connection.driver.session();
            const key = result.records[0].get(0)

            if(key !== null){
                const result1 = await session1.writeTransaction( tx =>
                    tx.run(
                        `MATCH(:key{shortcut:"${key}"})-[s:especify]->()
                         RETURN s`
                    )              
                )
                response.json({
                    "key_1": result1.records[0].get(0).properties.sentence,
                    "key_2": result1.records[1].get(0).properties.sentence
                })
            }else{
                const result1 = await session.writeTransaction( tx =>
                    tx.run(
                        `MATCH (:key)-[:especify{sentence:'${parent}'}]->(a)
                         RETURN a.name`
                    )              
                )
                response.json({
                    "name": result1.records[0].get(0),                    
                })
            }

        }
        

    } catch (error) {
        console.log('[Find] - ERROR: '+error)
    }finally{
        session.close();
    }

}
