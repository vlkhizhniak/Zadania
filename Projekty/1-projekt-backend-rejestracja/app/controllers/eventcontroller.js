const Event = require('../models/eventmodel');

module.exports = {
    index: (req, res) => {
        Event.find()
            .lean()
            .then((eventlist) => {
                res.render('home', { eventlist: eventlist })
            })
            .catch((err) => {
                res.send(err)
            })
    },
    add: (req, res) => {
        if (req.body.name === "" || req.body.event === "---" || req.body.city === "---") {
            Event.find()
                .lean()
                .then((eventlist) => {
                    res.render("home", {
                        eventlist: eventlist,
                        nofield: true,
                    });
                })
        } else {
            const newEvent = new Event(req.body);
            newEvent.save();
            res.redirect("/");
        }
    },
    delete: (req, res) => {
        Event.findByIdAndDelete(req.params.id)
            .catch((err) => {
                res.send(err)
            })
            .then(() => {
                res.redirect('/')
            })
    },
    confirm: (req, res) => {
        Event.find()
            .lean()
            .catch((err) => {
                res.send(err)
            })
            .then((eventlist) => {
                res.render('home', {
                    eventlist: eventlist,
                    ID: (req.params.id),
                    confirm: true,
                    message: "Usunąć zapis na szkolenie?"
                })
            })
    }
};