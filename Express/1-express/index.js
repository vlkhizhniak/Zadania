const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/express");

app.use(express.urlencoded({ extended: true }));
app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set('views',__dirname + '/views');


const User = require("./app/models/users")

app.get('/', function(req, res){
    User.find().lean().then((OneUser)=>{
        res.render('home', {user: OneUser})
    }).catch((err)=>{
        res.send(err)
    })
});

app.listen(8080, function () {
    console.log("Node.js server is active");
});