const express = require('express');
const router = express.Router();
const {
    getMaternity, updateMaternity,
    getNewborn, updateNewborn,
    getBaby, updateBaby,
    getFamily, updateFamily
} = require('../controllers/portfolioController');

router.get('/maternity', getMaternity);
router.put('/maternity', updateMaternity);

router.get('/newborn', getNewborn);
router.put('/newborn', updateNewborn);

router.get('/baby', getBaby);
router.put('/baby', updateBaby);

router.get('/family', getFamily);
router.put('/family', updateFamily);

module.exports = router;
