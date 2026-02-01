import React from 'react';
import { Icon } from '@iconify/react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const CourseCard = ({ course, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {course.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-sm font-medium text-brand-100">{course.level}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-gray-500 mb-6 flex-grow leading-relaxed">
                    {course.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                        <Icon icon="mdi:tag-text-outline" className="text-brand-500 text-xl" />
                        {course.price}
                    </div>

                    <button className="p-3 bg-gray-50 rounded-full text-gray-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                        <Icon icon="mdi:arrow-right" className="text-xl" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
