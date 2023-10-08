const Customer = require('../models/customermodel');
const Action = require('../models/ActionModel');

module.exports = {
    index: (req, res) => {
        Customer.findById(req.params.id)
            .then((onecustomer) => {
                res.render('actions/addaction', onecustomer)
            })
    },
    add: (req, res) => {
        // console.log({...req.body})
        req.body.id = req.params.id
        const newAction = new Action(req.body);
        newAction.save();

        Customer.updateOne(
            { _id: req.params.id },
            { $push: { actions: newAction._id } }
        ).catch((err) => {
            res.send(err);
        });
        res.redirect('/customer/' + req.params.id)
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
        .then((oneaction)=> {
            res.redirect('/customer/' +oneaction.id)
        });
    }
}
