const BlogPost = require('../models/BlogPost');

// @desc    Get all posts
// @route   GET /api/posts
const getPosts = async (req, res) => {
    try {
        const showAll = req.query.includeDrafts === 'true';
        const query = showAll ? {} : { isPublished: true };
        const posts = await BlogPost.find(query).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single post
// @route   GET /api/posts/:slug
const getPostBySlug = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (post) res.json(post);
        else res.status(404).json({ message: 'Post not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = async (req, res) => {
    try {
        console.log("Create Post Payload:", req.body);
        const { title, content, excerpt, tags } = req.body;
        let coverImage = '';
        if (req.file) {
            coverImage = req.file.path;
        }

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const post = await BlogPost.create({
            title,
            slug,
            content,
            excerpt: excerpt || 'No excerpt provided', // Fallback
            tags: tags ? tags.split(',') : [],
            coverImage,
            isPublished: req.body.isPublished === 'true' || req.body.isPublished === true,
            publishedAt: (req.body.isPublished === 'true' || req.body.isPublished === true) ? Date.now() : null
        });
        res.status(201).json(post);
    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
const updatePost = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.excerpt = req.body.excerpt || post.excerpt;

        if (req.body.isPublished !== undefined) {
            const willPublish = req.body.isPublished === 'true' || req.body.isPublished === true;
            if (willPublish && !post.isPublished) {
                post.publishedAt = Date.now();
            }
            post.isPublished = willPublish;
        }

        if (req.body.tags) post.tags = req.body.tags.split(',').map(t => t.trim());

        if (req.file) {
            post.coverImage = req.file.path;
        }

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
const deletePost = async (req, res) => {
    try {
        await BlogPost.deleteOne({ _id: req.params.id });
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPosts, getPostBySlug, createPost, updatePost, deletePost };
