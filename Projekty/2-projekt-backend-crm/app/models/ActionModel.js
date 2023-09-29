const mongoose = require("mongoose");

const Action = new mongoose.Schema({
    date: {type: String, required: true},
    kind: {type: String, required: true},
    description: {type: String, required: true},
    customers: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true}
});

module.exports = mongoose.model('Action', Action);