const express = require('express');
const router = express.Router();
const { getPages, getPageBySlug, updatePageSection, createPage } = require('../controllers/pageController');
const upload = require('../middleware/upload');

router.route('/').get(getPages).post(createPage);
router.route('/:slug').get(getPageBySlug);
router.route('/:slug/sections/:sectionId').put(upload.single('image'), updatePageSection);

module.exports = router;
