const express = require('express');
const router = express.Router();
const { getPages, getPageBySlug, updatePageSection, createPage } = require('../controllers/pageController');
const multer = require('multer');

// Use memory storage to handle buffer manually for date fix
const upload = multer({ storage: multer.memoryStorage() });

router.route('/').get(getPages).post(createPage);
router.route('/:slug').get(getPageBySlug);
router.route('/:slug/sections/:sectionId').put(upload.single('image'), updatePageSection);

module.exports = router;
