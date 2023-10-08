const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/userController');

router.get('/signup', (req, res)=>{
    res.render('users/signup')
});
router.get('/login', (req, res)=>{
    res.render('users/login')
});

router.get('/confirm', (req, res)=>{
    res.render('users/confirm')
});

router.post('/signup', usercontroller.signup);
router.post('/signup', usercontroller.signup);
router.post('/confirm', usercontroller.confirm);
router.post('/login', usercontroller.login);
router.get('/logout', usercontroller.logout);
router.get('/verify/:id/:token', usercontroller.verify);

module.exports = router