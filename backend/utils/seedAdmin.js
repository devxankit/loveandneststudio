const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

dotenv.config({ path: './.env' });

connectDB();

const seedAdmin = async () => {
    try {
        // Clear existing admins
        await Admin.deleteMany();

        const admin = new Admin({
            email: 'jagratimca25@ipsacademy.org',
            password: 'adminpassword123' // Initial password
        });

        await admin.save();

        console.log('Admin account seeded successfully!');
        console.log('Email: jagratimca25@ipsacademy.org');
        console.log('Password: adminpassword123');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
