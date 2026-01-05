const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PageContent = require('../models/PageContent');
const BlogPost = require('../models/BlogPost');
const Testimonial = require('../models/Testimonial');
const { pages, blogPosts, testimonials } = require('../data/initialContent');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await PageContent.deleteMany();
        await BlogPost.deleteMany();
        await Testimonial.deleteMany();

        await PageContent.insertMany(pages);
        await BlogPost.insertMany(blogPosts);
        await Testimonial.insertMany(testimonials);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // Destroy data logic if needed
} else {
    importData();
}
