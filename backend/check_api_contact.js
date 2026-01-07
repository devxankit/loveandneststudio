// const axios = require('axios');

async function checkContact() {
    try {
        const response = await fetch('http://localhost:5000/api/pages/contact');
        const data = await response.json();
        console.log("Status:", response.status);
        if (response.status === 200) {
            console.log("Contact Page Found!");
            console.log("Sections:", data.sections.map(s => s.id).join(', '));
            console.log("Sidebar Images:", JSON.stringify(data.sections.find(s => s.id === 'sidebar').content));
        } else {
            console.log("Not Found:", data);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

checkContact();
