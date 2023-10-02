const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email']
        },
        password: { type: String, required: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'invalid password'] }
    });

User.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            res.send(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                res.send(err);
            }

            user.password = hash;
            next();
        });
    });
});

User.methods.generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id }, "secretKey", { expiresIn: "1h" });
    return token;
};

module.exports = mongoose.model("User", User);