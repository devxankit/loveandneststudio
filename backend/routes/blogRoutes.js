const express = require('express');
const router = express.Router();
const { getPosts, getPostBySlug, createPost, updatePost, deletePost } = require('../controllers/blogController');
const upload = require('../middleware/upload');

router.route('/')
    .get(getPosts)
    .post(upload.single('coverImage'), createPost);

router.route('/:slug').get(getPostBySlug);

router.route('/:id')
    .put(upload.single('coverImage'), updatePost)
    .delete(deletePost);

module.exports = router;
