import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description }) => {
    const { t, i18n } = useTranslation();

    const siteTitle = title || t('seo.title');
    const siteDescription = description || t('seo.description');
    const siteKeywords = t('seo.keywords');

    React.useEffect(() => {
        // Force Title Update
        document.title = siteTitle;

        // Helper to update or create meta tags
        const updateMeta = (nameAttr, nameValue, content) => {
            let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(nameAttr, nameValue);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Force Meta Description
        updateMeta('name', 'description', siteDescription);

        // Force Open Graph
        updateMeta('property', 'og:title', siteTitle);
        updateMeta('property', 'og:description', siteDescription);
        updateMeta('property', 'og:locale', i18n.language);

        // Force Twitter
        updateMeta('name', 'twitter:title', siteTitle);
        updateMeta('name', 'twitter:description', siteDescription);

    }, [siteTitle, siteDescription, i18n.language]);

    return (
        <Helmet htmlAttributes={{ lang: i18n.language }}>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={siteKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:locale" content={i18n.language} />
            {/* Placeholder image for now, can be updated with a real asset later */}
            <meta property="og:image" content="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
        </Helmet>
    );
};

export default SEO;
