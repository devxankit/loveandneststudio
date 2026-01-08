const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const Services = require('../models/Services');

router.get('/', async (req, res) => {
    try {
        const baseUrl = 'https://loveandneststudio.com';

        // Static Pages
        const staticPages = [
            '',
            '/about',
            '/contact',
            '/services',
            '/portfolio',
            '/portfolio/maternity',
            '/portfolio/newborn',
            '/portfolio/baby',
            '/portfolio/family',
            '/blog'
        ];

        let urls = staticPages.map(url => ({
            url: `${baseUrl}${url}`,
            changefreq: 'weekly',
            priority: url === '' ? 1.0 : 0.8
        }));

        // Dynamic Services
        const servicesDoc = await Services.findOne();
        if (servicesDoc && servicesDoc.serviceList) {
            servicesDoc.serviceList.forEach(service => {
                if (service.id && service.isActive) {
                    urls.push({
                        url: `${baseUrl}/services/${service.id}`,
                        changefreq: 'monthly',
                        priority: 0.9
                    });
                }
            });
        }

        // Dynamic Blog Posts
        const posts = await BlogPost.find({ isPublished: true }).select('slug updatedAt');
        posts.forEach(post => {
            urls.push({
                url: `${baseUrl}/blog/${post.slug}`,
                changefreq: 'weekly',
                priority: 0.7,
                lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString()
            });
        });

        // Generate XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(({ url, changefreq, priority, lastmod }) => `
    <url>
        <loc>${url}</loc>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
        ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    </url>
    `).join('')}
</urlset>`;

        res.header('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();

    } catch (error) {
        console.error("Sitemap Error:", error);
        res.status(500).end();
    }
});

module.exports = router;
