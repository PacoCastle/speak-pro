import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description }) => {
    const { t, i18n } = useTranslation();

    const siteTitle = title || t('seo.title');
    const siteDescription = description || t('seo.description');
    const siteKeywords = t('seo.keywords');

    React.useEffect(() => {
        document.title = siteTitle;
    }, [siteTitle]);

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
