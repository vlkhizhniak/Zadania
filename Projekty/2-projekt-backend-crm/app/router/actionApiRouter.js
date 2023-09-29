const express = require('express');
const router = express.Router();

const actionapicontroller = require('../controllers/actionApiController')


router.get('/:id', actionapicontroller.index);
router.post('/add/:id', actionapicontroller.add);
router.get('/delete/:id', actionapicontroller.delete);
router.get('/one/:id', actionapicontroller.edit);
router.post('/edit/:id', actionapicontroller.update);

module.exports = router