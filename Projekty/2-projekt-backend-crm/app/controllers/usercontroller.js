const User = require("../models/UserModel");
const Token = require("../models/TokenModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const makeid = require("../utils/generateCode");

module.exports = {
  signup: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user)
        return res.render("users/signup", {
          error: true,
          message: "User with given email already exist!",
        });

      user = await new User({
        email: req.body.email,
        password: req.body.password,
      }).save();

      let token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(48).toString("hex"),
      }).save();

      const message = `
      <h2>Potwierdź mail</h2>
      http://localhost:8080/user/verify/${user._id}/${token.token}
      
      `;

      /* 
       const code = makeid(4)

      let token = await new Token({
        userId: user._id,
        token: code,
      }).save();

      const message = `
      <h2>Potwierdź kod</h2>
      ${code}
      http://localhost:8080/user/confirm
      `; */
      await sendEmail(user.email, "Verify Email", message);

      res.render("users/login", {
        error: true,
        message: "An Email sent to your account please verify",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  verify: async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await User.findByIdAndUpdate(user._id, { verified: true });
    await Token.findByIdAndRemove(token._id);

    res.render("users/login", {
      error: true,
      message: "email verified sucessfully",
    });
  },

  confirm: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.body.code,
    });
    if (!token) return res.status(400).send("Invalid link");

    await User.findByIdAndUpdate(user._id, { verified: true });
    await Token.findByIdAndRemove(token._id);

    res.render("users/login", {
      error: true,
      message: "email verified sucessfully",
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

        if (!user.verified) {
          res.render("users/login", {
            error: true,
            message: "Your mail is not confirmed",
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
            res.redirect("/customer?page=1");
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
    res.clearCookie("AuthToken");
    res.redirect("/user/login");
  },
};
