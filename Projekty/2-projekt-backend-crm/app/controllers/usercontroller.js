const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports = {
    signup: (req, res) => {
        const newUser = User(req.body);
        newUser
            .save()
            .then(() => {
                res.redirect("/user/login");
            })
            .catch((err) => {
                if (err.code === 11000) {
                    res.render("users/signup", {
                        error: true,
                        message: "User already exist",
                    });
                }
            });
    },
    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((user) => {
                // console.log(user)
                if (!user) {
                    res.render("users/login", {
                        error: true,
                        message: "That user does not exist",
                        user: req.body,
                    });
                    return;
                }

                bcrypt.compare(req.body.password, user.password, (err, logged) => {
                    if (err) {
                        res.render("users/login", {
                            error: true,
                            message: "Login error",
                        });
                        return;
                    }

                    if (logged) {
                        const token = user.generateAuthToken(user);
                        res.cookie("AuthToken", token);
                        res.redirect("/customer");
                    } else {
                        res.render("users/login", {
                            error: true,
                            message: "Incorrect login or password",
                        });
                        return;
                    }
                });
            })
            .catch((err) => {
                res.send(err);
            });
    },
    logout: (_req, res) => {
        res.clearCookie('AuthToken');
        res.redirect('/user/login');
    }
};