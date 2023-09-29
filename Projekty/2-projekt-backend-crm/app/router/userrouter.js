const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/userController');

router.get('/signup', (req, res)=>{
    res.render('users/signup')
});
router.get('/login', (req, res)=>{
    res.render('users/login')
});
router.post('/signup', usercontroller.signup);
router.post('/login', usercontroller.login);
router.get('/logout', usercontroller.logout);

module.exports = router