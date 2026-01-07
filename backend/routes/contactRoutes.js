const express = require('express');
const router = express.Router();
const { getContactContent, updateContactContent } = require('../controllers/contactController');

router.get('/', getContactContent);
router.put('/', updateContactContent);

module.exports = router;
