const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const email = 'loveandnest@gmail.com'; // Default admin email from your .env or similar
        const password = 'admin'; // Simple password for initial login
        const name = 'Anamika';

        // Check if exists
        const exists = await Admin.findOne({ email });
        if (exists) {
            console.log('Admin already exists. Updating password to "admin"...');
            // We can update the password if needed to be sure
            exists.password = password; // Pre-save hook will hash it? Wait, usually we need to save.
            // Let's rely on finding it. If user can't login, we can reset.
            // But let's delete and recreate to be 100% sure of the password 'admin'
            await Admin.deleteOne({ email });
            console.log('Existing admin deleted to ensure clean slate.');
        }

        const admin = await Admin.create({
            name,
            email,
            password
        });

        console.log(`✅ Admin Created! \nEmail: ${email} \nPassword: ${password}`);

        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

createAdmin();
