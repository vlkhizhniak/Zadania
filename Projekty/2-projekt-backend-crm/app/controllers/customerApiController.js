const Customer = require('../models/CustomerModel');
const Action = require('../models/ActionModel');

module.exports = {
    index: async (req, res) => {
        try {
            const customerlist = await Customer.find().lean();
            res.status(200).json(customerlist);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    add: async (req, res) => {
        try {
            const newcustomer = new Customer(req.body);
            await newcustomer.save();
            res.status(201).json({ message: 'Customer added successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    delete: async (req, res) => {
        try {
            const onecustomer = await Customer.findById(req.params.id).lean();
            for (const element of onecustomer.actions) {
                await Action.findByIdAndDelete(element);
            }
            await Customer.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    single: async (req, res) => {
        try {
            const onecustomer = await Customer.findById(req.params.id).lean();
            const actionlist = await Action.find({ customers: onecustomer._id }).lean();
            res.status(200).json({
                onecustomer: onecustomer,
                actionlist: actionlist
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            await Customer.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: 'Customer updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
