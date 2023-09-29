const Customer = require('../models/CustomerModel');
const Action = require('../models/ActionModel');

module.exports = {
    index: (req, res) => {
        Customer.findById(req.params.id)
            .lean()
            .then((onecustomer) => {
                    res.status(200).json({ onecustomer: onecustomer })
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    add: (req, res) => {
        req.body.customers = req.params.id
        const newAction = new Action(req.body);
        newAction.save()
            .then((savedAction) => {
                return Customer.updateOne(
                    { _id: req.params.id },
                    { $push: { actions: savedAction._id } }
                );
            })
            .then(() => {
                res.status(201).json({ message: 'Action added successfully' });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    delete: (req, res) => {
        Action.findByIdAndDelete(req.params.id)
            .then((deletedAction) => {
                return Customer.updateOne(
                    { actions: { $in: req.params.id } },
                    { $pull: { actions: req.params.id } }
                );
            })
            .then(() => {
                res.status(200).json({ message: 'Action deleted successfully' });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    edit: (req, res) => {
        Action.findById(req.params.id)
            .then((oneaction) => {
                res.status(200).json(oneaction);
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    update: (req, res) => {
        Action.findByIdAndUpdate(req.params.id, req.body)
            .then((oneaction) => {
                res.status(200).json({ message: 'Action updated successfully' });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    }
};
