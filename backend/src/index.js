const connection = require('./database/connection');
const key = require('./controllers/keyController');
const family = require('./controllers/familyController');

async function quit (){
    await connection.session.close();
    connection.driver.close();
}   

async function run(){
    const result =  await connection.session.writeTransaction(tx =>
            tx.run(
                `
                MERGE(a:key{shortcut:"Inicio"})
                RETURN ID(a)
                `,
                )
        
     );
    
    const id_init = result.records[0].get(0).low;
    console.log(id_init);
    /*
    Necessário uma chave inicial no banco de dados(por enquanto)
    Alguns exemplos:
    */
    const x = await key("com apêndices locomotores rudimentares no abdômen; ápteros; ametábolos","Subclasse Apterygota",id_init);
    await key("sem apêndices locomotores no abdômen; com ou sem asas; metábolos","Subclasse Pterygota",id_init);
    await key("com antenas","Com antenas",x+1 );
    await family("COLLEMBOLA", "ápice do abdômen com fúrcula, raramente ausente; antenas com 4 a 6 artículos; corpo geralmente recoberto com escamas",x+2 );
    await key(" ápice do abdômen com 2 ou 3 filamentos (2 cercos e 1 filamento caudal mediano)","Abdomen com 2 ou 3 filamentos",x+2 );
    await family("THYNASURA","com 3 filamentos no ápice do abdômen", x+4 );
    await family("DYPLURA","com 2 filamentos",x+4 );

    
    quit();
}

run();