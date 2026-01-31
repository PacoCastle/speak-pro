import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const teachers = [
    {
        name: "Sarah Jenkins",
        role: "Business English Expert",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
        flag: "🇺🇸"
    },
    {
        name: "David Martinez",
        role: "IELTS & Exam Prep",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
        flag: "🇬🇧"
    },
    {
        name: "Emma Wilson",
        role: "Kids Specialist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
        flag: "🇨🇦"
    }
];

const TeachersSection = () => {
    return (
        <section id="teachers" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Your Teachers</h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Learn from the best. Our tutors are certified native speakers passionate about your success.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {teachers.map((teacher, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-all"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={teacher.image}
                                    alt={teacher.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 text-3xl shadow-sm">
                                    {teacher.flag}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900">{teacher.name}</h3>
                                <p className="text-brand-600 font-medium mb-4">{teacher.role}</p>

                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">TEFL Certified</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">5+ Years Exp</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="text-brand-600 font-bold hover:text-brand-700 flex items-center justify-center gap-2 mx-auto">
                        View All 50+ Teachers <Icon icon="mdi:arrow-right" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TeachersSection;
