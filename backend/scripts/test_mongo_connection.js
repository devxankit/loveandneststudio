const mongoose = require('mongoose');
const path = require('path');
// Load .env relative to this script file
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const testConnection = async () => {
    try {
        console.log('Testing MongoDB Connection...');
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI is undefined in .env');
        }
        // Mask password for logging
        console.log('URI:', uri.replace(/:([^:@]+)@/, ':****@'));

        await mongoose.connect(uri);
        console.log('✅ MongoDB Connected Successfully!');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`Found ${collections.length} collections:`);
        collections.forEach(c => console.log(` - ${c.name}`));

        mongoose.disconnect();
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
    }
};

testConnection();
