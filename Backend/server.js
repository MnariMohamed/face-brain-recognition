var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var bcrypt=require("bcrypt-nodejs");
var cors=require("cors");
var register=require("./controllers/register");
var signIn=require("./controllers/signin");
var profiles=require("./controllers/profiles");
var image=require("./controllers/image");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var db = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
ssl: true
  }
});



app.use(cors());
app.use(bodyParser.json());



app.get("/", function (req, res) {
  res.send("it works");
});

app.post("/signin", (req, res)=>{signIn.handleSignin(req, res, db, bcrypt)})

app.post("/register", (req, res)=>{register.handleRegister(req, res, db, bcrypt)});

app.get("/profiles/:id",(req, res)=>{profiles.profiles(req, res, db)});

app.put("/image", (req, res)=>{image.addEntry(req, res, db)});
app.post("/imageurl", (req, res)=>{image.handleApiCall(req, res)});



app.listen(process.env.PORT || 3000, function () {
  console.log("started");
})
