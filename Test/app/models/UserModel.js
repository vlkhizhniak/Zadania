const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name:{type: String, required: true, unique: false},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true, unique: false}
},{timestamps: true});

module.exports= mongoose.model('User', User)