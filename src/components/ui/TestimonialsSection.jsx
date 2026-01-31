import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const testimonials = [
    {
        name: "Maria Rossi",
        role: "Business Executive",
        content: "SpeakPro completely transformed my ability to lead international meetings. The teachers are incredibly patient and professional.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
        lang: "it"
    },
    {
        name: "Carlos Mendez",
        role: "University Student",
        content: "The platform is so intuitive and the classes are never boring. I passed my TOEFL with a score higher than I expected!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
        lang: "es"
    },
    {
        name: "Sarah Thompson",
        role: "Mother of 2",
        content: "My children look forward to their English class every day. The games and songs they use are perfect for making them learn while having fun.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2570&auto=format&fit=crop",
        lang: "en"
    }
];

const TestimonialsSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-brand-50/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        {t('testimonials.title')}
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        {t('testimonials.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-xl shadow-brand-500/5 border border-white relative"
                        >
                            <div className="flex text-yellow-400 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Icon key={i} icon="mdi:star" className="text-2xl" />
                                ))}
                            </div>

                            <blockquote className="text-gray-700 italic mb-8 leading-relaxed">
                                "{item.content}"
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-100"
                                />
                                <div>
                                    <p className="font-bold text-gray-900">{item.name}</p>
                                    <p className="text-sm text-brand-600">{item.role}</p>
                                </div>
                            </div>

                            <div className="absolute top-8 right-8 text-4xl text-brand-100 font-serif opacity-50">
                                <Icon icon="mdi:format-quote-close" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
