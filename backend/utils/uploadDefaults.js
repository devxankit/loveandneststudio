const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const PageContent = require('../models/PageContent');
const connectDB = require('../config/db');
const { cloudinary } = require('../config/cloudinary');

dotenv.config({ path: path.join(__dirname, '../.env') });
connectDB();

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'loveandnest/contact/defaults'
        });
        return result.secure_url;
    } catch (error) {
        console.error(`Failed to upload ${filePath}:`, error.message);
        return null; // Fallback or handle error
    }
};

const setupDefaults = async () => {
    try {
        console.log("🚀 Starting upload of default images to Cloudinary...");

        const baseDir = path.join(__dirname, '../../frontend/src/assets/images/contract');

        // Map local filenames to their logical roles
        const files = {
            entrance: 'Screenshot 2025-12-30 104112.png',
            collage1: 'Screenshot 2025-12-30 104125.png',
            collage2: 'Screenshot 2025-12-30 104143.png',
            vertical: '_FOR BA .jpg'
        };

        const urls = {};

        for (const [key, filename] of Object.entries(files)) {
            const filePath = path.join(baseDir, filename);
            if (fs.existsSync(filePath)) {
                console.log(`Uploading ${filename}...`);
                const url = await uploadImage(filePath);
                if (url) {
                    urls[key] = url;
                    console.log(`✅ ${key} uploaded: ${url}`);
                }
            } else {
                console.warn(`⚠️ File not found: ${filePath}`);
            }
        }

        console.log("💾 Updating Database with Cloudinary URLs...");

        const page = await PageContent.findOne({ pageSlug: 'contact' });
        if (!page) {
            console.error("❌ Contact page not found in DB!");
            process.exit(1);
        }

        // Update sections
        const sidebarIndex = page.sections.findIndex(s => s.id === 'sidebar');
        if (sidebarIndex !== -1) {
            page.sections[sidebarIndex].content.entranceImage = urls.entrance || '';
            page.sections[sidebarIndex].content.verticalImage = urls.vertical || '';
        }

        const collageIndex = page.sections.findIndex(s => s.id === 'collage');
        if (collageIndex !== -1) {
            page.sections[collageIndex].content.images = [
                urls.collage1,
                urls.collage2
            ].filter(Boolean); // Remove nulls
        }

        page.markModified('sections');
        await page.save();

        console.log("🎉 Defaults synced! Admin Panel should now show these images.");
        process.exit();

    } catch (error) {
        console.error("Script Error:", error);
        process.exit(1);
    }
};

setupDefaults();
