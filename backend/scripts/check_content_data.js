const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Check various collections
        const collections = [
            { name: 'HomePage', model: 'homepages' },
            { name: 'Maternity', model: 'maternities' },
            { name: 'Newborn', model: 'newborns' },
            { name: 'Baby', model: 'babies' },
            { name: 'Family', model: 'families' },
            { name: 'Services', model: 'services' },
            { name: 'Testimonial', model: 'testimonials' },
            { name: 'BlogPost', model: 'blogposts' },
            { name: 'Inquiry', model: 'inquiries' }
        ];

        console.log('\n--- Data Counts ---');
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.model).countDocuments();
            console.log(`${col.name}: ${count} documents`);
        }

        console.log('\n-------------------');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

checkData();
