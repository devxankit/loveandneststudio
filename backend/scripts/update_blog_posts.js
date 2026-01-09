const mongoose = require('mongoose');
const dotenv = require('dotenv');
const BlogPost = require('./models/BlogPost');

dotenv.config({ path: './.env' });

const updatePosts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const result = await BlogPost.updateMany(
            {},
            { $set: { isPublished: true, publishedAt: new Date() } }
        );

        console.log(`Updated ${result.modifiedCount} posts`);
        process.exit(0);
    } catch (error) {
        console.error('Error updating posts:', error);
        process.exit(1);
    }
};

updatePosts();
