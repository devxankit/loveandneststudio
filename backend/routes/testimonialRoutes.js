const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial, deleteTestimonial, updateTestimonial } = require('../controllers/testimonialController');
const upload = require('../middleware/upload');

router.route('/')
    .get(getTestimonials)
    .post(upload.single('image'), createTestimonial);

router.route('/:id')
    .put(upload.single('image'), updateTestimonial)
    .delete(deleteTestimonial);

module.exports = router;
