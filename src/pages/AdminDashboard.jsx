import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AdminStudents from '../components/admin/AdminStudents';
import AdminTeachers from '../components/admin/AdminTeachers';
import AdminBookings from '../components/admin/AdminBookings';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock Stats (Memoized to avoid lint warning about sync State if needed, but simple obj here is fine)
    const stats = {
        students: 124,
        activeBookings: 15,
        revenue: "$12,450"
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                    <p className="mt-2 text-gray-600">You must be an administrator to view this page.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-4 px-4 py-2 bg-brand-600 text-white rounded hover:bg-brand-700"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    const navigation = [
        { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
        { id: 'students', label: 'Students', icon: 'mdi:account-school' },
        { id: 'teachers', label: 'Teachers', icon: 'mdi:human-male-board' },
        { id: 'bookings', label: 'Bookings', icon: 'mdi:calendar-check' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-white hidden md:block">
                <div className="p-6">
                    <h2 className="text-xl font-bold font-display">SpeakPro Admin</h2>
                </div>
                <nav className="mt-6">
                    {navigation.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${activeTab === item.id
                                    ? 'bg-brand-600 border-r-4 border-white text-white'
                                    : 'text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            <Icon icon={item.icon} className="text-xl" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {navigation.find(n => n.id === activeTab)?.label}
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                            {user.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1"
                        >
                            <Icon icon="mdi:logout" /> Logout
                        </button>
                    </div>
                </div>

                {/* Content Rendering */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="text-gray-500 text-sm font-medium uppercase text-brand-500">Total Students</div>
                                <div className="mt-2 text-3xl font-bold text-gray-900">{stats.students}</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="text-gray-500 text-sm font-medium uppercase text-blue-500">Active Bookings</div>
                                <div className="mt-2 text-3xl font-bold text-gray-900">{stats.activeBookings}</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="text-gray-500 text-sm font-medium uppercase text-green-500">Total Revenue</div>
                                <div className="mt-2 text-3xl font-bold text-gray-900">{stats.revenue}</div>
                            </div>
                        </div>

                        {/* Recent Activity Snapshot */}
                        <AdminBookings />
                    </div>
                )}

                {activeTab === 'students' && (
                    <div className="animate-fade-in">
                        <AdminStudents />
                    </div>
                )}

                {activeTab === 'teachers' && (
                    <div className="animate-fade-in">
                        <AdminTeachers />
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="animate-fade-in">
                        <AdminBookings />
                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;

