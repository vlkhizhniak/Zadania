const express = require('express');
const router = express.Router();

const userapicontroller = require('../controllers/userApiController');


router.post('/signup', userapicontroller.signup);
router.post('/login', userapicontroller.login);
router.get('/logout', userapicontroller.logout);

module.exports = router