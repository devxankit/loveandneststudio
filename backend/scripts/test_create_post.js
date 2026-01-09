const axios = require('axios');
const FormData = require('form-data');

async function testCreatePost() {
    try {
        const form = new FormData();
        form.append('title', 'Test Post ' + Date.now());
        form.append('content', 'Content');
        form.append('excerpt', 'Excerpt');
        form.append('tags', 'tag1');
        form.append('isPublished', 'true');

        console.log('Sending...');
        const res = await axios.post('http://localhost:5000/api/posts', form, { headers: form.getHeaders() });
        console.log('Success:', res.data);
    } catch (err) {
        if (err.response) {
            console.log('STATUS:', err.response.status);
            console.log('MESSAGE:', err.response.data.message);
            // console.log('STACK:', err.response.data.stack); // Too long
        } else {
            console.log('ERROR:', err.message);
        }
    }
}
testCreatePost();
