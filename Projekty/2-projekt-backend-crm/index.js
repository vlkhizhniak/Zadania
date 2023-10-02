const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/projekt-crm");

app.use(express.urlencoded({ extended: true }));
app.engine("hbs", hbs.engine({
    extname: ".hbs",
    helpers: {
        equal: function (value, compareValue, options) {
            if (value === compareValue) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        times: function (n, block) {
            let accum = "";
            for (let i = 1; i <= n; ++i) {
                accum += block.fn(i);
            }
            return accum;
        }
    }
}));
app.set("view engine", "hbs");
app.set('views', __dirname + '/views');

app.use(cookieParser());
app.use(express.json());

const actionrouter = require('./app/router/actionRouter');
const customerrouter = require('./app/router/customerRouter');
const userrouter = require('./app/router/userRouter');
const authmiddleware = require('./app/middleware/auth');
const customerapirouter = require('./app/router/customerApiRouter');
const actionapirouter = require('./app/router/actionApiRouter');
const userapirouter = require('./app/router/userApiRouter');
const authmiddlewareapi = require('./app/middleware/authApi')

app.get('/', (req, res) => {
    res.redirect('/customer')
});
app.use("/customer", authmiddleware, customerrouter);
app.use("/user", userrouter);
app.use('/action', authmiddleware, actionrouter);
app.use('/api/customer', authmiddlewareapi, customerapirouter);
app.use('/api/action', authmiddlewareapi, actionapirouter);
app.use('/api/user', userapirouter);


app.listen(8080, function () {
    console.log("Node.js server is active");
});