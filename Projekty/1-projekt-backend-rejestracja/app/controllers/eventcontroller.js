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
        if (req.body.name === '') {
            res.render('home', {
                noname: true
            })
        }
        if (req.body.event === '---') {
            res.render('home', {
                noevent: true
            })
        }
        if (req.body.city === '---') {
            res.render('home', {
                nocity: true
            })
        }
        const newEvent = new Event(req.body);
        newEvent.save()
            // .catch((err) => {
            //     res.send(err)
            // })
        res.redirect('/')
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