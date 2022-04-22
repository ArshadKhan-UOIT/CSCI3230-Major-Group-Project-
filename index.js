const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

app.get("/", function(request, response){
  response.sendFile( __dirname +'/public/index.html');
});

app.set('port',process.env.PORT ||4500);
app.listen(app.get('port'),function(){
  console.log(`Nodejs Server is up and listing to port ${app.get('port')}`);
});
