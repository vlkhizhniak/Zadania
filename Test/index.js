const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require('mongoose');
const Post = require('./app/models/postmodel');
mongoose.connect('mongodb://127.0.0.1:27017/express');

const blogrouter= require("./app/router/blogrouter")
const userrouter= require("./app/router/userrouter")

app.use("/files", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/mongoose/:id", function (req, res) {
  Post.findById(req.params.id).then((post) => {
    res.render("home", {
      title: post.title,
      content: post.content,
      displayTitle: true,
      names: ["Adam", "Ola", "Kasia", "Tomek"],
    });
  }).catch((err) => {
    res.send(err)
  })
})

app.get("/", function (req, res) {
  res.render("home", {
    title: "My app title",
    content: "Lorem ipsum",
    displayTitle: true,
    names: ["Adam", "Ola", "Kasia", "Tomek"],
  });
});

app.use(express.urlencoded({ extended: true }))

app.use("/blog", blogrouter);
app.use("/user", userrouter);

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
