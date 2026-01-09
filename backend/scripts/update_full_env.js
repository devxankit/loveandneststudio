const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
const envContent = `PORT=5000
MONGO_URI=mongodb+srv://loveandnest_db_user:loveandneststudio@loveandneststudio.bfvoz33.mongodb.net/loveandnest?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME=dpbivtg9l
CLOUDINARY_API_KEY=996391349819479
CLOUDINARY_API_SECRET=aDNa-iGyqELBiDaW3e-gzj8EkFI

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=loveandnest@gmail.com
EMAIL_PASS=bqsw gdxu frwv wjtz
EMAIL_FROM=Love & Nest Studio

JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
`;

try {
    fs.writeFileSync(envPath, envContent.trim());
    console.log('✅ Successfully updated .env file with new credentials.');
} catch (error) {
    console.error('❌ Failed to update .env:', error);
}
