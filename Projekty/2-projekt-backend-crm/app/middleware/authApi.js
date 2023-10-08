const jwt = require('jsonwebtoken');
const User = require("../models/UserModel");

module.exports = (req, res, next) => {
    const token = req.cookies['AuthToken'];

    if (token) {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_KEY);

            User.findById(verified._id)
                .then((user) => {
                    if (!user) {
                        res.status(401).json({ error: true, message: "User not found" });
                        return;
                    }

                    res.locals.userId = user._id;
                    next();
                })
                .catch((err) => {
                    res.status(500).json({ error: true, message: "Database error" });
                });
        } catch {
            res.status(401).json({ error: true, message: "Invalid token" });
        }
    } else {
        res.status(401).json({ error: true, message: "Token not provided" });
    }
};
