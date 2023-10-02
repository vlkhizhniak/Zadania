const Customer = require('../models/CustomerModel')
const Action = require('../models/ActionModel');

module.exports = {
    index: (req, res) => {
        const limit = 10;
        const page = req.query.page;
        const count = Customer.countDocuments().then((count) => {
            Customer.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .lean()
                .then((customerlist) => {
                    res.render('home', {
                        customerlist: customerlist,
                        totalPages: Math.ceil(count / limit),
                        currentPage: Number(page),
                        nextPage: Number(page) + 1,
                        prevPage: Number(page) - 1
                    })
                })
        });
    },
    add: (req, res) => {
        const newcustomer = new Customer(req.body);
        newcustomer.save().then(() => {
            res.redirect('/customer?page=1')
        }).catch((err) => {
            if (err.name === 'ValidationError') {
                for (const validationError of Object.values(err.errors)) {
                    if (validationError.path === 'address.zip') {
                        res.render('customers/add', { zipError: true });
                        return;
                    } else if (validationError.path === 'nip') {
                        res.render('customers/add', { nipError: true });
                        return;
                    }
                    else {
                        res.render('customers/add', { requiredError: true });
                        return;
                    }
                }
            }
        })
    },
    delete: async (req, res) => {
        try {
            const onecustomer = await Customer.findById(req.params.id).lean();

            for (const element of onecustomer.actions) {
                await Action.findByIdAndDelete(element);
            }

            await Customer.findByIdAndDelete(req.params.id);

            res.redirect('/customer?page=1');
        } catch (err) {
            res.send(err);
        }
    },
    single: (req, res) => {
        const limit = 10;
        const page = req.query.page;
        const count = Customer.countDocuments().then((count) => {
            Customer.findById(req.params.id).lean()
                .then((onecustomer) => {
                    Action.find({ customers: onecustomer._id })
                        .limit(limit * 1)
                        .skip((page - 1) * limit)
                        .lean()
                        .then((actionlist) => {
                            res.render('customers/onecustomer', {
                                onecustomer: onecustomer,
                                actionlist: actionlist,
                                totalPages: Math.ceil(count / limit),
                                currentPage: Number(page),
                                nextPage: Number(page) + 1,
                                prevPage: Number(page) - 1
                            })
                        })
                });
        })
    },
    edit: (req, res) => {
        Customer.findById(req.params.id)
            .then((onecustomer) => {
                res.render('customers/editcustomer', onecustomer)
            })
    },
    update: (req, res) => {
        Customer.findByIdAndUpdate(req.params.id, req.body)
            .then((onecustomer) => {
                res.redirect("/customer/" + onecustomer._id + '?page=1')
            })
    }
}