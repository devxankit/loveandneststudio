const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const checkCollections = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const collections = await mongoose.connection.db.listCollections().toArray();

        console.log('\n--- MongoDB Collection Report ---');
        console.log(`Total Collections: ${collections.length}\n`);
        console.log('Name'.padEnd(30) + 'Count');
        console.log('-'.repeat(40));

        const activeCollections = [
            'homepages', 'contactpages', 'aboutpages', 'portfoliopages',
            'inquiries', 'blogposts', 'testimonials', 'services',
            'globalsettings', 'maternities', 'newborns', 'babies',
            'families', 'admins', 'users'
        ];

        const report = collections.map(col => {
            return {
                name: col.name,
                status: activeCollections.includes(col.name) ? 'Active' : 'Potential Duplicate',
            }
        });

        // Get counts
        for (const item of report) {
            item.count = await mongoose.connection.db.collection(item.name).countDocuments();
        }

        const fs = require('fs');
        fs.writeFileSync('db_report.json', JSON.stringify(report, null, 2));
        console.log('Report saved to db_report.json');

        mongoose.connection.close();

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkCollections();
