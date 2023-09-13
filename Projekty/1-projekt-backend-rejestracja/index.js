const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/projekt-rejestracja");

app.use(express.urlencoded({ extended: true }));
app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set('views',__dirname + '/views');

const Eventcontroller= require('./app/controllers/eventcontroller')

app.get('/', Eventcontroller.index);
app.post('/add',Eventcontroller.add);
app.get('/delete/confirm/:id', Eventcontroller.confirm);
app.get('/delete/:id', Eventcontroller.delete);

app.listen(8080, function () {
    console.log("Node.js server is active");
});
