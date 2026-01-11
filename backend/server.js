const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const compression = require('compression');

// Load config
dotenv.config({ override: true });

// Connect to Database
connectDB();

const app = express();

// Middleware
// Middleware
app.use(compression()); // Enable Gzip compression

// 1. Inject PNA Header for ALL requests
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Private-Network", "true");
    next();
});

// 2. Allowed Origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5000",
    "https://www.loveandneststudio.com",
    "https://loveandneststudio.com",
    "https://loveandnest-frontend.vercel.app" // Add Vercel frontend domain if applicable
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin); // Helpful for debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Access-Control-Allow-Private-Network"],
    optionsSuccessStatus: 204
};

// 3. Apply CORS
app.use(cors(corsOptions));


app.use(express.json()); // Body parser

// Routes
const pageRoutes = require('./routes/pageRoutes');
const blogRoutes = require('./routes/blogRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const servicesRoutes = require('./routes/servicesRoutes');


const globalSettingsRoutes = require('./routes/globalSettingsRoutes');

app.use('/api/pages', pageRoutes);
app.use('/api/posts', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/settings', globalSettingsRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes')); // Added Dashboard Route
app.use('/api/newborn', require('./routes/newbornRoutes'));
app.use('/api/maternity', require('./routes/maternityRoutes'));
app.use('/api/baby', require('./routes/babyRoutes'));
app.use('/api/family', require('./routes/familyRoutes'));
app.use('/api/portfolio-page', require('./routes/portfolioPageRoutes'));
app.use('/api/home-page', require('./routes/homePageRoutes'));
app.use('/api/about-page', require('./routes/aboutPageRoutes'));
app.use('/api/contact-page', require('./routes/contactPageRoutes'));
app.use('/api/hospital', require('./routes/hospitalRoutes'));
app.use('/api/cakesmash', require('./routes/cakeSmashRoutes'));
app.use('/api/toddler', require('./routes/toddlerRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));


app.use('/sitemap.xml', require('./routes/sitemapRoutes'));
app.use('/api/sitemap', require('./routes/sitemapRoutes'));

// Base Route
app.get('/', (req, res) => {
    res.send('Love & Nest API is running...');
});

// Error Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`[Error] ${req.method} ${req.url}: ${err.message}`);
    console.error(err.stack);
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
