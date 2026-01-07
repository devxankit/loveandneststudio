const express = require('express');
const router = express.Router();
const { getGlobalSettings, updateGlobalSettings } = require('../controllers/globalSettingsController');

router.get('/', getGlobalSettings);
router.put('/', updateGlobalSettings);

module.exports = router;
