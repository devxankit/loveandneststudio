const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testUpdate() {
    try {
        console.log("Testing text-only update...");
        const form = new FormData();
        const content = {
            heading: "Updated Heading via Script",
            subheading: "Test Subheading",
            text: "This is a test update."
        };
        form.append('content', JSON.stringify(content));

        const res = await axios.put('http://localhost:5000/api/pages/contact/sections/hero', form, {
            headers: {
                ...form.getHeaders()
            }
        });
        console.log("Text Update Success:", res.data.sections[0].content);

    } catch (error) {
        console.error("Text Update Failed:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testUpdate();
