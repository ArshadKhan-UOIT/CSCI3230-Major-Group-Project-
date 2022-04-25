const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

app.get("/", function(request, response){
  response.sendFile( __dirname +'/public/index.html');
});

// app.get("/", function(request, response){
//   response.sendFile( __dirname +'/public/homepage.html');
// });

app.get("/homepage", function(request, response){
  response.sendFile( __dirname +'/public/homepage.html');
});

app.get("/products", function(request, response){
  console.log("https://fakestoreapi.com/products");

  let url = "";
  if (request.query.type == "all") {
    url = "";
  }
  else if (request.query.type == "id") {
    url = "/" + request.query.query;
  }
  else if (request.query.type == "category") {
    url = "/" + request.query.type + "/" + request.query.query ;
  }

  console.log("calling: " + url);

  axios.get("https://fakestoreapi.com/products" + url)
    .then(res => response.send(res.data));
});


app.set('port',process.env.PORT ||4500);
app.listen(app.get('port'),function(){
  console.log(`Nodejs Server is up and listing to port ${app.get('port')}`);
});
