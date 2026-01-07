const express = require('express');
const router = express.Router();
const { getServicesContent, updateServicesContent } = require('../controllers/servicesController');

router.get('/', getServicesContent);
router.put('/', updateServicesContent);

module.exports = router;
