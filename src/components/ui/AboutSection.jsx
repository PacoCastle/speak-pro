import React from 'react';
import { Icon } from '@iconify/react';

const AboutSection = () => {
    return (
        <section id="about" className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Who We Are
                        </h2>
                        <div className="w-20 h-1.5 bg-brand-500 rounded-full mb-8" />

                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            SpeakPro Academy was founded with a simple mission: to make English fluency accessible, enjoyable, and effective for everyone.
                        </p>
                        <p className="text-lg text-gray-500 mb-6 font-light">
                            We believe that language is the bridge to new opportunities. Whether you are looking to advance your career, travel the world, or give your children a head start, our methodology ensures rapid progress.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div>
                                <h3 className="text-3xl font-bold text-brand-600">5k+</h3>
                                <p className="text-gray-500">Active Students</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-brand-600">120+</h3>
                                <p className="text-gray-500">Certified Teachers</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-brand-100 rounded-3xl transform rotate-3" />
                        <img
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop"
                            alt="Students learning"
                            className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
