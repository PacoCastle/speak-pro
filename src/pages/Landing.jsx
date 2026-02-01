import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroVideo from '../components/ui/HeroVideo';
import LeadForm from '../components/ui/LeadForm';
import FeaturesSection from '../components/ui/FeaturesSection';
import CoursesSection from '../components/ui/CoursesSection';
import KidsSection from '../components/ui/KidsSection';
import TeachersSection from '../components/ui/TeachersSection';
import AboutSection from '../components/ui/AboutSection';
import TestimonialsSection from '../components/ui/TestimonialsSection';
import EnrollmentTestSection from '../components/ui/EnrollmentTestSection';
import SEO from '../components/common/SEO';

const Landing = () => {
    return (
        <>
            <SEO />
            <Navbar />
            <HeroVideo />
            <FeaturesSection />
            <AboutSection />
            <EnrollmentTestSection />
            <CoursesSection />
            <TeachersSection />
            <KidsSection />
            <TestimonialsSection />
            <LeadForm />
            <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4 font-display flex items-center gap-2">
                            <span className="text-brand-500 font-display font-black">SpeakPro</span> Academy
                        </h3>
                        <p className="text-gray-400 max-w-sm">
                            Empowering global communication through personalized language learning experiences for adults and children worldwide.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Programs</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>General English</li>
                            <li>Business English</li>
                            <li>Kids & Teens</li>
                            <li>Italian Immersion</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/#about">About Us</a></li>
                            <li><a href="/#teachers">Our Teachers</a></li>
                            <li><a href="/#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
                    <p>&copy; 2026 SpeakPro Academy. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Landing;
