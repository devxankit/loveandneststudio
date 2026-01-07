const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './.env', override: true });
console.log("DEBUG ENV URI:", process.env.MONGO_URI);

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes
const pageRoutes = require('./routes/pageRoutes');
const blogRoutes = require('./routes/blogRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const homeRoutes = require('./routes/homeRoutes');
const contactRoutes = require('./routes/contactRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');


const globalSettingsRoutes = require('./routes/globalSettingsRoutes');

app.use('/api/pages', pageRoutes);
app.use('/api/posts', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/settings', globalSettingsRoutes);
app.use('/api/upload', require('./routes/uploadRoutes'));

// Base Route
app.get('/', (req, res) => {
    res.send('Love & Nest API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
