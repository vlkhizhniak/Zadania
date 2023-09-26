const express = require('express');
const router = express.Router();

const actioncontroller = require('../controllers/actioncontroller')


router.get('/:id', actioncontroller.index);
router.post('/add/:id', actioncontroller.add);
router.get('/delete/:id', actioncontroller.delete);
router.get('/edit/:id', actioncontroller.edit);
router.post('/edit/:id', actioncontroller.update);

module.exports = router