const Customer = require('../models/CustomerModel')
const Action = require('../models/ActionModel');

module.exports = {
    index: (req, res) => {
        Customer.find()
            .lean()
            .then((customerlist) => {
                res.render('home', { customerlist: customerlist })
            })
            .catch((err) => {
                res.send(err)
            })
    },
    add: (req, res) => {
        // console.log(req.body)
        const newcustomer = new Customer(req.body);
        newcustomer.save().then(() => {
            res.redirect('/customer')
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

            res.redirect('/customer');
        } catch (err) {
            res.send(err);
        }
    },

    single: (req, res) => {
        Customer.findById(req.params.id).lean()
            .then((onecustomer) => {
                Action.find({ id: onecustomer._id }).lean()
                    .then((actionlist) => {
                        res.render('customers/onecustomer', { onecustomer: onecustomer, actionlist: actionlist })
                    })
            });
    },
    edit: (req, res) => {
        Customer.findById(req.params.id)
            .then((onecustomer) => {
                // console.log(onecustomer)
                res.render('customers/editcustomer', onecustomer)
            })
    },
    update: (req, res) => {
        Customer.findByIdAndUpdate(req.params.id, req.body)
            .then((onecustomer) => {
                res.redirect("/customer/" + onecustomer._id)
            })
            .catch((err) => {
                res.send(err);
            });
    }
}