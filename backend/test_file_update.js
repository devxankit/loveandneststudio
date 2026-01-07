const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpdateWithFile() {
    try {
        console.log("Testing file upload update...");

        // Create a dummy file
        const dummyPath = path.join(__dirname, 'test_image.txt');
        fs.writeFileSync(dummyPath, 'This is a fake image content');

        const form = new FormData();
        const content = {
            heading: "Updated With File",
        };
        form.append('content', JSON.stringify(content));

        // Append file
        form.append('image', fs.createReadStream(dummyPath), 'test_image.txt');
        form.append('targetKey', 'verticalImage');

        const res = await axios.put('http://localhost:5000/api/pages/contact/sections/sidebar', form, {
            headers: {
                ...form.getHeaders()
            }
        });
        console.log("File Update Success:", res.data.sections.find(s => s.id === 'sidebar').content);

        // Clean up
        fs.unlinkSync(dummyPath);

    } catch (error) {
        console.error("File Update Failed:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testUpdateWithFile();
