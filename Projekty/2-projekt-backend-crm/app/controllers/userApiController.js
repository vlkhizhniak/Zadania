const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports = {
    signup: (req, res) => {
        const newUser = User(req.body);
        newUser
            .save()
            .then(() => {
                res.status(201).json({ message: "User created successfully" });
            })
            .catch((err) => {
                res.status(500).json({ error: error });
            });
    },
    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ error: true, message: "User does not exist" });
                    return;
                }
                bcrypt.compare(req.body.password, user.password, (err, logged) => {
                    if (err) {
                        res.status(500).json({ error: true, message: "Login error" });
                        return;
                    }
                    if (logged) {
                        const token = user.generateAuthToken(user);
                        res.cookie("AuthToken", token);
                        res.status(200).json({ message: "Login successful" });
                    } else {
                        res.status(401).json({ error: true, message: "Incorrect login or password" });
                        return;
                    }
                });
            })
            .catch((err) => {
                res.status(500).json({ error: true, message: "An error occurred" });
            });
    },
    logout: (_req, res) => {
        res.clearCookie('AuthToken');
        res.status(200).json({ message: "Logged out successfully" });
    }
};