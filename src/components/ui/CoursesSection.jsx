import React from 'react';
import { useTranslation } from 'react-i18next';
import { courses } from '../../data/courses';
import CourseCard from './CourseCard';

const CoursesSection = () => {
    const { t } = useTranslation();
    return (
        <section id="courses" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('courses_section.title_prefix')} <span className="text-brand-600">{t('courses_section.title_highlight')}</span>
                        </h2>
                        <p className="text-xl text-gray-500">
                            {t('courses_section.subtitle')}
                        </p>
                    </div>

                    <button className="px-6 py-3 bg-gray-50 text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                        {t('courses_section.cta')}
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <CourseCard key={course.id} course={course} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
