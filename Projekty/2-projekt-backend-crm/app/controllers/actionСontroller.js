const Customer = require('../models/CustomerModel');
const Action = require('../models/ActionModel');

module.exports = {
    index: (req, res) => {
        Customer.findById(req.params.id).lean()
            .then((onecustomer) => {
                if (req.query.invalid) {
                    res.render('actions/addaction', { validError: true, onecustomer: onecustomer })
                } else {
                    res.render('actions/addaction', { onecustomer: onecustomer })
                }
            })
    },
    add: (req, res) => {
        let invalid = false
        // console.log({...req.body})
        req.body.customers = req.params.id
        const newAction = new Action(req.body);
        newAction.save().catch((err) => {
            invalid = true
            console.log(err)
        })

        Customer.updateOne(
            { _id: req.params.id },
            { $push: { actions: newAction._id } }
        )
            .then(() => {
                if (invalid) {
                    res.redirect('/action/' + req.params.id + '?invalid=true')
                } else {
                    res.redirect('/customer/' + req.params.id + '?page=1')
                }
            })

    },
    delete: (req, res) => {
        Action.findByIdAndDelete(req.params.id).then(
            Customer.updateOne({ actions: { $in: req.params.id } },
                { $pull: { actions: req.params.id } }))
        res.redirect('back')
    },
    edit: (req, res) => {
        Action.findById(req.params.id)
            .then((oneaction) => {
                res.render('actions/editaction', oneaction)
            })
    },
    update: (req, res) => {
        Action.findByIdAndUpdate(req.params.id, req.body)
            .then((oneaction) => {
                res.redirect('/customer/' + oneaction.customers + '?page=1')
            });
    }
}
