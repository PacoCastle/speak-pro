import React, { useState } from 'react';
import { Icon } from '@iconify/react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BookingModal from './BookingModal';

const EnrollmentTestSection = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingType, setBookingType] = useState('Adults');

    const handleBook = (type) => {
        setBookingType(type);
        setIsModalOpen(true);
    };

    return (
        <section id="test" className="py-24 bg-brand-600 relative overflow-hidden mb-24">
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                defaultType={bookingType}
            />

            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-400 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {t('placement.title')}
                        </h2>
                        <p className="text-xl text-brand-100 mb-10">
                            {t('placement.subtitle')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <motion.button
                                onClick={() => handleBook('Adults')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center text-center group transition-all cursor-pointer block w-full text-left"
                            >
                                <div className="p-4 bg-brand-50 rounded-xl mb-4 group-hover:bg-brand-500 transition-colors">
                                    <Icon icon="mdi:account-school" className="text-4xl text-brand-600 group-hover:text-white" />
                                </div>
                                <span className="font-bold text-gray-900 text-lg mb-1">{t('placement.cta_adults')}</span>
                                <span className="text-sm text-gray-500">Ages 16+</span>
                                <span className="text-xs text-brand-500 mt-2 font-semibold">Book Now &rarr;</span>
                            </motion.button>

                            <motion.button
                                onClick={() => handleBook('Kids')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center text-center group transition-all cursor-pointer block w-full text-left"
                            >
                                <div className="p-4 bg-yellow-50 rounded-xl mb-4 group-hover:bg-yellow-400 transition-colors">
                                    <Icon icon="mdi:face-man-shimmer" className="text-4xl text-yellow-600 group-hover:text-white" />
                                </div>
                                <span className="font-bold text-gray-900 text-lg mb-1">{t('placement.cta_kids')}</span>
                                <span className="text-sm text-gray-500">Ages 4 - 15</span>
                                <span className="text-xs text-yellow-600 mt-2 font-semibold">Book Now &rarr;</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="hidden lg:block relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2670&auto=format&fit=crop"
                            alt="Student taking test"
                            className="rounded-3xl shadow-2xl transform rotate-3"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                                    <Icon icon="mdi:clock-check" className="text-2xl" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Fast Results</p>
                                    <p className="text-sm text-gray-500">Instant score & level</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EnrollmentTestSection;
