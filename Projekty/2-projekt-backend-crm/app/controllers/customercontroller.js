const Customer = require("../models/customermodel");
const Action = require("../models/ActionModel");

module.exports = {
  index: async (req, res) => {
    const { page = 1, limit = 2 } = req.query;
    const count = await Customer.countDocuments();
    Customer.find()
      .lean()
      .limit(limit * 1)
      // I don't think i need to explain the math here
      .skip((page - 1) * limit)
      .then((customerlist) => {
        
        res.render("home", {
          customerlist: customerlist,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  add: (req, res) => {
    // console.log(req.body)
    const newcustomer = new Customer(req.body);
    newcustomer
      .save()
      .then(() => {
        res.redirect("/customer");
      })
      .catch((err) => {
        res.send(err);
      });
  },
  delete: (req, res) => {
    Customer.findByIdAndDelete(req.params.id).catch((err) => {
      res.send(err);
    });
    res.redirect("/customer");
  },
  single: (req, res) => {
    Customer.findById(req.params.id)
      .lean()
      .then((onecustomer) => {
        Action.find({ id: onecustomer._id })
          .lean()
          .then((actionlist) => {
            res.render("customers/onecustomer", {
              onecustomer: onecustomer,
              actionlist: actionlist,
            });
          });
      });
  },
  edit: (req, res) => {
    Customer.findById(req.params.id).then((onecustomer) => {
      // console.log(onecustomer)
      res.render("customers/editcustomer", onecustomer);
    });
  },
  update: (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body)
      .then((onecustomer) => {
        res.redirect("/customer/" + onecustomer._id);
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
