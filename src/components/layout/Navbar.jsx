import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Logo from '../ui/Logo';
import { useScrollTo } from '../../hooks/useScrollTo';

const languages = [
    { code: 'en', name: 'English', flag: 'circle-flags:us' },
    { code: 'es', name: 'Español', flag: 'circle-flags:es' },
    { code: 'it', name: 'Italiano', flag: 'circle-flags:it' }
];



const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const { t, i18n } = useTranslation();
    const scrollTo = useScrollTo();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setShowLangDropdown(false);
    };

    const handleNavClick = (e, href) => {
        e.preventDefault();
        scrollTo(href.replace('#', ''));
        setMobileMenuOpen(false);
    };

    const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.home'), href: '#home' },
        { name: t('nav.features'), href: '#features' },
        { name: "About", href: "#about" },
        { name: "Teachers", href: "#teachers" },
        { name: t('nav.courses'), href: '#courses' },
        { name: t('nav.kids'), href: '#kids', badge: 'New' },
        { name: t('nav.contact'), href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={(e) => handleNavClick(e, '#home')}>
                        <Logo className="h-12 w-auto" />
                        <div className="flex flex-col">
                            <span className={`font-sans font-black leading-none tracking-tight text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                                SpeakPro
                            </span>
                            <span className={`text-xs uppercase tracking-[0.2em] font-bold ${isScrolled ? 'text-brand-600' : 'text-brand-300'}`}>
                                Academy
                            </span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden xl:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-sm font-semibold transition-colors hover:text-brand-500 relative ${isScrolled ? 'text-gray-600' : 'text-white/90'
                                    }`}
                            >
                                {link.name}
                                {link.badge && (
                                    <span className="absolute -top-3 -right-6 px-1.5 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full">
                                        {link.badge}
                                    </span>
                                )}
                            </a>
                        ))}

                        {/* Free Test Button */}
                        <a
                            href="#test"
                            className={`hidden xl:inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-brand-600 to-blue-500 hover:from-brand-700 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all`}
                        >
                            <Icon icon="mdi:clipboard-text-outline" className="mr-2 text-lg" />
                            {t('nav.freeTest')}
                        </a>

                        {/* Multi-Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setShowLangDropdown(!showLangDropdown)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${isScrolled
                                    ? 'border-gray-200 text-gray-700 bg-gray-50'
                                    : 'border-white/20 text-white bg-white/5 hover:bg-white/10'}`}
                            >
                                <Icon icon={currentLang.flag} className="text-lg" />
                                <span className="text-sm font-bold">{currentLang.code.toUpperCase()}</span>
                                <Icon icon="mdi:chevron-down" className={`transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showLangDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                                    >
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-50 transition-colors text-left"
                                            >
                                                <Icon icon={lang.flag} className="text-xl" />
                                                <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Removed Login Button */}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`xl:hidden text-2xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                    >
                        <Icon icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl px-6 py-24"
                    >
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-black text-white hover:text-brand-400"
                                >
                                    {link.name}
                                </motion.a>
                            ))}

                            <div className="pt-8 mt-8 border-t border-white/10">
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-4">Language</p>
                                <div className="flex flex-wrap gap-4">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { changeLanguage(lang.code); setMobileMenuOpen(false); }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${i18n.language === lang.code
                                                ? 'bg-brand-500 border-brand-500 text-white'
                                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                        >
                                            <Icon icon={lang.flag} />
                                            <span className="font-bold">{lang.code.toUpperCase()}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
