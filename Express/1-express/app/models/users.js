const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: String,
    username: String,
    adress: {
        street: String,
        suite: String,
        city: String,
        zipcode: Number
    },
    website: String,
});
module.exports= mongoose.model('User', User);