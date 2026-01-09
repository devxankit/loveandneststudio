const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const BASE_URL = 'http://localhost:5000/api';

const testFullFlow = async () => {
    try {
        console.log('1. Trying to LOGIN...');
        const credentials = {
            email: 'loveandnest@gmail.com',
            password: 'admin'
        };

        const loginRes = await axios.post(`${BASE_URL}/auth/login`, credentials);
        console.log('✅ LOGIN SUCCESS!');
        const token = loginRes.data.token;
        console.log('Token received:', token.substring(0, 20) + '...');

        console.log('\n2. Trying to Access DASHBOARD with token...');
        const dashboardRes = await axios.get(`${BASE_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('✅ DASHBOARD ACCESS SUCCESS!');
        console.log('Data Preview:', JSON.stringify(dashboardRes.data, null, 2).substring(0, 200) + '...');

    } catch (error) {
        console.error('❌ FAILED:');
        if (error.response) {
            console.error(`Status: ${error.response.status} ${error.response.statusText}`);
            console.error('Response:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
};

testFullFlow();
