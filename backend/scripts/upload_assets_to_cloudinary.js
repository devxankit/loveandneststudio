const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// CORRECTED PATH: Navigate up from backend/scripts to root, then into frontend
// backend/scripts/../../frontend...
const IMAGES_DIR = path.resolve(__dirname, '../../frontend/src/assets/images');
const LOG_FILE = 'upload_log.txt';

// Helper to log progress
const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(LOG_FILE, msg + '\n');
};

const uploadImage = async (filePath) => {
    try {
        const relativePath = path.relative(IMAGES_DIR, filePath);
        // Create a folder structure in Cloudinary that mirrors local folders, prefixed with 'loveandnest/assets'
        const folderName = 'loveandnest/assets/' + path.dirname(relativePath).replace(/\\/g, '/');
        const publicId = path.basename(filePath, path.extname(filePath));

        log(`Uploading: ${relativePath} -> Folder: ${folderName}`);

        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName,
            public_id: publicId,
            resource_type: 'auto',
            overwrite: false // Skip if already exists
        });

        log(`✅ Success: ${result.secure_url}`);
        return { file: relativePath, url: result.secure_url };
    } catch (error) {
        log(`❌ Failed: ${filePath} - ${error.message}`);
        return null; // Continue even if one fails
    }
};

const getFiles = (dir) => {
    if (!fs.existsSync(dir)) {
        log(`Create Check Failed: Directory not found: ${dir}`);
        return [];
    }
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else {
            if (/\.(png|jpg|jpeg|webp|svg)$/i.test(file)) {
                results.push(file);
            }
        }
    });
    return results;
};

const main = async () => {
    log(`Starting bulk upload... Scanning: ${IMAGES_DIR}`);
    const files = getFiles(IMAGES_DIR);

    if (files.length === 0) {
        log("No files found to upload.");
        return;
    }

    log(`Found ${files.length} images.`);

    const mapping = {};

    for (const file of files) {
        const res = await uploadImage(file);
        if (res) {
            // Normalize path for JS map key (forward slashes)
            const key = res.file.replace(/\\/g, '/');
            mapping[key] = res.url;
        }
    }

    fs.writeFileSync('image_mapping.json', JSON.stringify(mapping, null, 2));
    log('Done! Mapping saved to image_mapping.json');
};

main();
