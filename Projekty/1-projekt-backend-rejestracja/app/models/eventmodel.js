const mongoose = require("mongoose");

const Event = new mongoose.Schema({
    // number: Number,
    name: String,
    event: String,
    city: String
});
module.exports = mongoose.model('Event', Event);