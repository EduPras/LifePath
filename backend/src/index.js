const connection = require('./database/connection');
const key = require('./controllers/keyController');
const family = require('./controllers/familyController');

async function quit (){
    await connection.session.close();
    connection.driver.close();
}   

async function run(){
    await connection.session.writeTransaction(tx => 
        tx.run('MERGE(:key{shortcut:"Inicio", id:"0"})')
     );
    /*
    Necessário uma chave inicial com id="0" no banco de dados(por enquanto)
    Alguns exemplos:
    */
    await key("1", "com apêndices locomotores rudimentares no abdômen; ápteros; ametábolos","Subclasse Apterygota","0" );
    await key("1*", "sem apêndices locomotores no abdômen; com ou sem asas; metábolos","Subclasse Pterygota","0" );
    await key("2*", "com antenas","Com antenas","1" );
    await family("COLLEMBOLA", "ápice do abdômen com fúrcula, raramente ausente; antenas com 4 a 6 artículos; corpo geralmente recoberto com escamas","2*" );
    await key("3*", " ápice do abdômen com 2 ou 3 filamentos (2 cercos e 1 filamento caudal mediano)","Abdomen com 2 ou 3 filamentos","2*" );
    await family("THYNASURA","com 3 filamentos no ápice do abdômen", "3*"  );
    quit();
}

run();