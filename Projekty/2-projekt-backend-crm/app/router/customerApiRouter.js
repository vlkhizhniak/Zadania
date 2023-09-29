const express = require('express');
const router = express.Router();

const customerapicontroller = require('../controllers/customerApiController');

router.get('/', customerapicontroller.index);
router.post('/add', customerapicontroller.add);
router.get('/delete/:id', customerapicontroller.delete);
router.get('/:id', customerapicontroller.single);
router.post('/edit/:id', customerapicontroller.update);


module.exports = router