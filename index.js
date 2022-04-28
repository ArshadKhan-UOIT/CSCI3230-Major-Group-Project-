const express = require('express');
const axios = require('axios');
const app = express();

const { getDatabase } = require('firebase-admin/database');
let flag = 0
var admin = require("firebase-admin");
// Fetch the service account key JSON file contents
var serviceAccount = require("./service_acc.json");
app.use(express.static(__dirname+'/public'));
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://online-shop-b1102-default-rtdb.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/users");

app.get("/", function(request, response){
  response.sendFile( __dirname +'/public/login.html');
});

// leave this here for now
app.get("/homepage", function(request, response){
  response.sendFile( __dirname +'/public/homepage.html');
});

app.get('/login', function(request,response){
  var user = request.query.usrname;
  var password = request.query.pass;
  console.log(user);
  ref.orderByValue().on('value', (snapshot) => {
    snapshot.forEach((data) => {

      if(data.val().Password== password && data.val().UserName == user)
      {
        flag = 1
      }
    });

    if(flag == 0 )
    {
      response.redirect("/");

     // setTimeout(redirect, 1000);
    }
    else{
      response.sendFile(__dirname+'/public/homepage.html');
      flag = 0;
    }

    function redirect(){
      response.redirect( __dirname +'/public/login.html');
    }
  });
});

app.get('/register', function(request,response){

  response.sendFile( __dirname +'/public/register.html');
});

app.get('/registration', function(request,response){

  let flag = 0
  var username = request.query.usrname;
  var pass = request.query.pass;
  db = getDatabase();
  refer = db.ref('users');

  const new_user = refer.ref.push('users');
  new_user.set({
    UserName: username,
    Password:pass
  });
  flag =1
  if(flag = 1)
  {
    response.sendFile( __dirname +'/public/register.html');

  }

});

app.get("/item", function(request, response){
  response.sendFile( __dirname +'/public/productPage.html');
});

app.get("/products", function(request, response){
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

  console.log("calling: https://fakestoreapi.com/products" + url);

  axios.get("https://fakestoreapi.com/products" + url)
    .then(res => response.send(res.data));
});

app.get("/logout", (req, res) => {
  res.redirect("/");
})

app.set('port',process.env.PORT ||4500);

app.listen(app.get('port'),function(){
  console.log(`Nodejs Server is up and listing to port ${app.get('port')}`);
});
