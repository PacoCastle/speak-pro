import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Helmet>
                <title>Dashboard | SpeakPro Academy</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-display">Student Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, <span className="font-bold text-brand-600">{user.email}</span></p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors bg-white font-bold text-sm"
                    >
                        <Icon icon="mdi:logout" /> Sign Out
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Progress Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-brand-100 text-brand-600 rounded-xl">
                                <Icon icon="mdi:chart-line-variant" className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Current Level</h3>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-gray-700">{user.level || 'B1 Intermediate'}</span>
                                <span className="text-brand-600 font-black">75%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div className="bg-brand-500 h-full rounded-full w-3/4 transition-all duration-1000 ease-out"></div>
                            </div>
                            <p className="text-sm text-gray-400 mt-3">You are doing great! Completing 2 more modules will advance you to the next level.</p>
                        </div>
                    </div>

                    {/* Next Class */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                <Icon icon="mdi:calendar-check" className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Next Class</h3>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-4">
                            <div className="flex items-center gap-2 text-blue-800 font-bold mb-1">
                                <Icon icon="mdi:clock-outline" /> Today, 5:00 PM
                            </div>
                            <p className="text-blue-600 text-sm">Conversation Practice</p>
                        </div>
                        <button className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                            <Icon icon="mdi:video" /> Join Classroom
                        </button>
                    </div>

                    {/* Homework */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-3">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                                <Icon icon="mdi:book-open-page-variant" className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Homework & Materials</h3>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                                            <Icon icon="mdi:file-document-outline" className="text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Unit {item}: Advanced Grammar</h4>
                                            <p className="text-xs text-gray-400">Added 2 days ago</p>
                                        </div>
                                    </div>
                                    <Icon icon="mdi:download" className="text-gray-300 group-hover:text-brand-500 text-xl" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
