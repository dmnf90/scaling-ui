import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '' }) {
    const siteUrl = 'https://ui.scaling.pt';
    const fullUrl = `${siteUrl}${path}`;
    const defaultDescription = 'A minimal, clean React component library built with Tailwind CSS. Browse 35+ production-ready components including buttons, forms, navigation, and overlays.';
    const defaultTitle = 'Scaling UI - React Component Library with Tailwind CSS';

    const pageTitle = title ? `${title} - Scaling UI` : defaultTitle;
    const pageDescription = description || defaultDescription;
    const imageUrl = `${siteUrl}/android-chrome-512x512.png`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="title" content={pageTitle} />
            <meta name="description" content={pageDescription} />

            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content={imageUrl} />

            {/* Twitter Card */}
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
}
