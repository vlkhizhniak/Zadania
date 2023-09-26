const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/projekt-crm");

app.use(express.urlencoded({ extended: true }));
app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

const actionrouter = require('./app/router/actionrouter');
const customerrouter = require('./app/router/customerrouter');
const userrouter = require('./app/router/userrouter');
const authmiddleware = require('./app/middleware/auth')

app.get('/', (req, res) => {
    res.redirect('/customer')
});
app.use("/customer", authmiddleware, customerrouter);
app.use("/user", userrouter);
app.use('/action', authmiddleware, actionrouter);


app.listen(8080, function () {
    console.log("Node.js server is active");
});