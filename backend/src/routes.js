const express = require('express');

// Conexão com web
const app = express();
app.use(express.json());
app.get('/', (request, response)=>{
    response.send('Working!!');
});
app.listen(3333);