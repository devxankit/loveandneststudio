import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    keywords,
    ogImage,
    ogUrl,
    canonicalUrl,
    schema,
    noindex = false
}) => {
    const siteTitle = 'Love & Nest Studio';
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Professional Maternity, Newborn & Baby Photography`;

    // Default description for global usage
    const defaultDescription = 'Love & Nest Studio by Anamika specializes in timeless maternity, newborn, baby, and family photography, creating artistic, magazine-quality portraits in a serene studio environment.';
    const finalDescription = description || defaultDescription;

    // Keywords strategy
    const defaultKeywords = 'photography, newborn photography, maternity photography, baby photography, family photography, professional photographer, love and nest studio, anamika photography';
    const finalKeywords = keywords || defaultKeywords;

    // URL resolution
    const siteUrl = 'https://loveandneststudio.com';
    const finalUrl = ogUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl);
    const finalCanonical = canonicalUrl || finalUrl;

    // Default Local Business Schema
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "PhotographyBusiness",
        "name": "Love & Nest Studio",
        "image": "https://loveandneststudio.com/Love&NestStudioLogo.jpeg",
        "logo": "https://loveandneststudio.com/Love&NestStudioLogo.jpeg",
        "@id": "https://loveandneststudio.com",
        "url": "https://loveandneststudio.com",
        "telephone": "+919876543210",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Studio Address",
            "addressLocality": "City",
            "postalCode": "110001",
            "addressCountry": "IN"
        },
        "priceRange": "$$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "10:00",
            "closes": "18:00"
        }
    };

    const structureData = schema || defaultSchema;
    const finalImage = ogImage || 'https://loveandneststudio.com/Love&NestStudioLogo.jpeg';

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <meta name="author" content="Love & Nest Studio by Anamika" />
            <link rel="canonical" href={finalCanonical} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            {!noindex && <meta name="robots" content="index, follow" />}

            {/* Open Graph (Facebook/LinkedIn) */}
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalUrl} />
            <meta property="og:image" content={finalImage} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={finalImage} />

            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(structureData)}
            </script>
        </Helmet>
    );
};

export default SEO;
