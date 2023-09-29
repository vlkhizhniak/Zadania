const express = require('express');
const router = express.Router();

const customercontroller = require('../controllers/customerСontroller');

router.get('/', customercontroller.index);
router.get('/add', (req, res)=>{
    res.render('customers/add');
});
router.post('/add', customercontroller.add);
router.get('/delete/:id', customercontroller.delete);
router.get('/:id', customercontroller.single);
router.get('/edit/:id', customercontroller.edit);
router.post('/edit/:id', customercontroller.update);


module.exports = router