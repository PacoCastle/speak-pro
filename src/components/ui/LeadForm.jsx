import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const LeadForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(data);
        setIsLoading(false);
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-gray-800 placeholder-gray-400 backdrop-blur-sm";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-2 font-display";

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-white">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Ready to Master <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">
                                English with Us?
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Join thousands of students who have transformed their careers and lives through our personalized English programs.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: "mdi:check-circle", text: "Free initial assessment" },
                                { icon: "mdi:check-circle", text: "Personalized learning path" },
                                { icon: "mdi:check-circle", text: "Native certified teachers" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-4 group">
                                    <div className="p-2 bg-brand-50 rounded-lg group-hover:bg-brand-100 transition-colors">
                                        <Icon icon={item.icon} className="text-brand-600 text-xl" />
                                    </div>
                                    <span className="text-lg text-gray-700 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Consultation</h3>

                        <AnimatePresence>
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-200 flex items-center gap-4"
                                >
                                    <Icon icon="mdi:check-circle" className="text-3xl" />
                                    <div>
                                        <p className="font-bold text-lg">Message Sent!</p>
                                        <p>We'll be in touch within 24 hours.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name Input */}
                                    <div>
                                        <label className={labelClasses}>Full Name</label>
                                        <div className="relative">
                                            <Icon icon="mdi:account" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                placeholder="John Doe"
                                                className={`${inputClasses} ${errors.name ? 'border-red-500 bg-red-50' : ''}`}
                                            />
                                        </div>
                                        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label className={labelClasses}>Email Address</label>
                                        <div className="relative">
                                            <Icon icon="mdi:email" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                            <input
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                                })}
                                                placeholder="john@example.com"
                                                className={`${inputClasses} ${errors.email ? 'border-red-500 bg-red-50' : ''}`}
                                            />
                                        </div>
                                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                                    </div>

                                    {/* Goal Select */}
                                    <div>
                                        <label className={labelClasses}>Learning Goal</label>
                                        <div className="relative">
                                            <Icon icon="mdi:target" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                            <select
                                                {...register("goal")}
                                                className={`${inputClasses} appearance-none cursor-pointer`}
                                            >
                                                <option value="career">Career Advancement</option>
                                                <option value="travel">Travel & Culture</option>
                                                <option value="exam">Exam Preparation (IELTS/TOEFL)</option>
                                                <option value="kids">For my Children</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isLoading}
                                        type="submit"
                                        className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                                    >
                                        {isLoading ? (
                                            <Icon icon="mdi:loading" className="animate-spin text-2xl" />
                                        ) : (
                                            <>
                                                <span>Start Your Journey</span>
                                                <Icon icon="mdi:arrow-right" className="text-xl" />
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LeadForm;
