const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
const newMongoURI = 'mongodb+srv://loveandnest_db_user:loveandneststudio@loveandneststudio.bfvoz33.mongodb.net/loveandnest?retryWrites=true&w=majority';

try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split(/\r?\n/);
    let found = false;
    const newLines = lines.map(line => {
        if (line.startsWith('MONGO_URI=')) {
            found = true;
            return `MONGO_URI=${newMongoURI}`;
        }
        return line;
    });

    if (!found) {
        newLines.push(`MONGO_URI=${newMongoURI}`);
    }

    fs.writeFileSync(envPath, newLines.join('\n'));
    console.log('✅ Updated .env with new MONGO_URI');
} catch (error) {
    console.error('Failed to update .env:', error);
}
