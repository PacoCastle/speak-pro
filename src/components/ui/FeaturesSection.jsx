import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: 'mdi:account-school',
        title: 'Expert Native Teachers',
        description: 'Learn from certified professionals who bring culture and nuance to every lesson.',
        color: 'bg-blue-500'
    },
    {
        icon: 'mdi:calendar-clock',
        title: 'Flexible Schedule',
        description: 'Book classes 24/7. Our global team ensures there is always a teacher available for you.',
        color: 'bg-indigo-500'
    },
    {
        icon: 'mdi:monitor-shimmer',
        title: 'Interactive Platform',
        description: 'Access cutting-edge learning tools, recorded sessions, and instant feedback.',
        color: 'bg-purple-500'
    }
];

const FeaturesSection = () => {
    return (
        <section id="features" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Why Choose <span className="text-brand-600">SpeakPro?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        We combine technology with human connection to accelerate your fluency.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                        >
                            <div className={`w-16 h-16 ${feature.color} bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all`}>
                                <Icon icon={feature.icon} className={`text-4xl ${feature.color.replace('bg-', 'text-')}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
