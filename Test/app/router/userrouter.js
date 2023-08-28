const express = require("express");
const router = express.Router();

const usercontroller =require('../conrollers/usercontroller')

router.get('/signup', (req, res)=>{
    res.render('UserViews/signUp')
});

router.post('/signup', usercontroller.create)

module.exports= router;