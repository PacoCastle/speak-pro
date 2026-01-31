import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

// Reverting to local import ensures the video always loads if the file exists
// The user needs to replace this file with the new one if desired
import heroVideo from '../../assets/videos/BackgroundVideo.mp4';

const HeroVideo = () => {
    const { t } = useTranslation();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="space-y-12 pt-32"
                >
                    {/* Logo & Brand */}
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <Logo className="h-32 w-auto filter drop-shadow-[0_0_20px_rgba(66,133,244,0.4)]" />
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.3em]">
                                SpeakPro
                            </h2>
                            <div className="h-1 w-24 bg-brand-500 mx-auto rounded-full shadow-[0_0_10px_#4285F4]" />
                        </div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-tight uppercase">
                        {t('hero.title2')}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                        {t('hero.subtitle')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(66,133,244,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection('test')}
                            className="px-10 py-5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-black text-xl shadow-2xl transition-all flex items-center gap-3"
                        >
                            <Icon icon="mdi:certificate" className="text-3xl" />
                            {t('placement.cta_adults') || "Get Level Test"}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection('teachers')}
                            className="px-10 py-5 bg-white/10 border-2 border-white/20 text-white rounded-2xl font-black text-xl backdrop-blur-md transition-all flex items-center gap-3"
                        >
                            <Icon icon="mdi:account-group" className="text-3xl" />
                            {t('hero.cta_teachers')}
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
            >
                <Icon icon="mdi:chevron-down" className="text-5xl" />
            </motion.div>
        </section>
    );
};

export default HeroVideo;
