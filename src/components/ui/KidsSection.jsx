import React from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

const KidsSection = () => {
    const { t } = useTranslation();

    return (
        <section id="kids" className="py-24 bg-brand-50 relative overflow-hidden">
            {/* Fun Background Elements */}
            <div className="absolute top-10 left-10 text-yellow-400 opacity-20">
                <Icon icon="mdi:star" className="text-6xl animate-bounce" />
            </div>
            <div className="absolute bottom-20 right-20 text-brand-400 opacity-20">
                <Icon icon="mdi:shape" className="text-8xl animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-bold text-sm mb-6">
                            ✨ {t('kids.badge')}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
                            {t('kids.title1')} <br />
                            <span className="text-brand-500">{t('kids.title2')}</span>
                        </h2>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {t('kids.description')}
                        </p>

                        <ul className="space-y-4 mb-10">
                            {t('kids.features', { returnObjects: true }).map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 text-gray-700 font-medium"
                                >
                                    <Icon icon="mdi:check-decagram" className="text-green-500 text-xl" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>

                        <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-2xl font-bold text-lg shadow-lg hover:shadow-yellow-300/50 transition-all transform hover:-translate-y-1">
                            {t('kids.cta')}
                        </button>
                    </div>

                    {/* Image/Visual */}
                    <div className="order-1 lg:order-2 relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-all duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2574&auto=format&fit=crop"
                                alt="Mother helping daughter with online learning"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3"
                        >
                            <div className="bg-green-100 p-2 rounded-lg">
                                <Icon icon="mdi:emoticon-happy" className="text-3xl text-green-600" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{t('kids.parents')}</p>
                                <div className="flex text-yellow-400 text-sm">
                                    <Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" /><Icon icon="mdi:star" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default KidsSection;
