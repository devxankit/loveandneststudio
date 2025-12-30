# Love & Nest Studio - Photography Website

A beautiful, modern photography website for Love & Nest Studio, specializing in newborn, maternity, baby, and family photography.

## 🎨 Features

- **Modern Design**: Sleek, professional design with vibrant gradients and smooth animations
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **SEO Optimized**: Built-in SEO best practices with meta tags and sitemap
- **Portfolio Showcase**: Dedicated portfolio sections for different photography categories
- **Blog System**: Share tips and stories with your clients
- **Contact Forms**: Easy booking and inquiry system
- **WhatsApp Integration**: Direct contact through WhatsApp button

## 📁 Project Structure

```
frontend/
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   ├── ImageCard.jsx
│   │   │   ├── Carousel.jsx
│   │   │   ├── ContactCTA.jsx
│   │   │   └── WhatsAppButton.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ScrollToTop.jsx
│   │   │
│   │   └── seo/
│   │       └── SEO.jsx
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Portfolio/
│   │   ├── Services/
│   │   ├── Blog/
│   │   ├── Offers/
│   │   ├── Contact/
│   │   └── NotFound.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   └── contactService.js
│   │
│   ├── data/
│   │   ├── portfolioData.js
│   │   ├── testimonialsData.js
│   │   ├── blogData.js
│   │   └── offersData.js
│   │
│   ├── styles/
│   │   ├── colors.css
│   │   ├── typography.css
│   │   ├── animations.css
│   │   └── global.css
│   │
│   ├── utils/
│   │   ├── seoConfig.js
│   │   └── helpers.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install additional required packages:**
   ```bash
   npm install react-router-dom react-helmet-async
   ```

3. **Update your `.env` file with your configuration:**
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_CONTACT_EMAIL=your-email@example.com
   VITE_CONTACT_PHONE=+911234567890
   VITE_WHATSAPP_NUMBER=911234567890
   ```

4. **Update `src/App.jsx`:**
   Replace the existing content with:
   ```jsx
   import { BrowserRouter as Router } from 'react-router-dom';
   import { HelmetProvider } from 'react-helmet-async';
   import Navbar from './components/layout/Navbar';
   import Footer from './components/layout/Footer';
   import ScrollToTop from './components/layout/ScrollToTop';
   import WhatsAppButton from './components/common/WhatsAppButton';
   import AppRoutes from './routes/AppRoutes';
   import './styles/global.css';

   function App() {
     return (
       <HelmetProvider>
         <Router>
           <ScrollToTop />
           <div className="app">
             <Navbar />
             <main>
               <AppRoutes />
             </main>
             <Footer />
             <WhatsAppButton />
           </div>
         </Router>
       </HelmetProvider>
     );
   }

   export default App;
   ```

5. **Update `src/index.css`:**
   Replace with:
   ```css
   @import './styles/global.css';
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🎨 Design System

### Colors
- **Primary**: `hsl(340, 80%, 60%)` - Pink
- **Secondary**: `hsl(280, 70%, 50%)` - Purple
- **Accent**: `hsl(45, 100%, 50%)` - Gold

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: Inter (body text)

### Animations
All components use smooth CSS transitions and keyframe animations for a premium feel.

## 📄 Pages

- **Home** - Hero section, featured portfolio, testimonials
- **About** - Studio information and story
- **Portfolio** - Photography categories (Newborn, Maternity, Baby, Family)
- **Services** - Service offerings and packages
- **Blog** - Tips and articles
- **Offers** - Special packages and promotions
- **Contact** - Contact form and information

## 🔧 Customization

### Adding Images
Place your images in the respective folders:
- `/src/assets/images/hero/` - Hero section images
- `/src/assets/images/portfolio/` - Portfolio images by category
- `/src/assets/images/blog/` - Blog post images
- `/src/assets/images/offers/` - Offer images

### Updating Content
- **Portfolio**: Edit `/src/data/portfolioData.js`
- **Testimonials**: Edit `/src/data/testimonialsData.js`
- **Blog Posts**: Edit `/src/data/blogData.js`
- **Offers**: Edit `/src/data/offersData.js`

### Styling
All global styles are in `/src/styles/`:
- `colors.css` - Color variables
- `typography.css` - Font settings
- `animations.css` - Animation utilities
- `global.css` - Global styles

## 🌐 SEO

The website includes:
- Dynamic meta tags for each page
- Sitemap.xml for search engines
- Robots.txt for crawler configuration
- Open Graph tags for social sharing
- Semantic HTML structure

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 968px
- Desktop: > 968px

## 🚀 Building for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## 📝 License

Copyright © 2024 Love & Nest Studio. All rights reserved.

## 👥 Support

For support or questions, contact: info@loveandneststudio.com
