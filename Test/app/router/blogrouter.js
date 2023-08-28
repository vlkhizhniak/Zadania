const express = require("express");
const router = express.Router()

const postcontroller = require('../conrollers/postcontroller')

router.get('', postcontroller.index);

router.get('/add', (req, res) => { res.render('Blog/addpost') });
router.post('/add', postcontroller.create);

router.get('/:id', postcontroller.post);
router.get('/edit/:id', postcontroller.editform);
router.post('/edit/:id', postcontroller.update);
router.get('/delete/:id', postcontroller.deletepost);

module.exports = router