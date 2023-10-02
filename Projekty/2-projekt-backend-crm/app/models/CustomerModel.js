const mongoose = require("mongoose");
const Customer = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            region: { type: String, required: true },
            zip: { type: String, required: true, match: [/^[0-9]{2}-[0-9]{3}/, 'invalid zip'] }
        },
        nip: {type: String, match:[/^[0-9]{10}$/, 'invalid nip']},
        actions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Action",
            },
        ]
    }
)
module.exports = mongoose.model('Customer', Customer);