const mongoose = require('mongoose');
const Post = new mongoose.Schema({
    title: String,
    content: String,
    author: String
},
    { timestamps: true }
);
module.exports = mongoose.model('Post', Post)