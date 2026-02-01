import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        students: 0,
        activeBookings: 0,
        revenue: 0
    });

    useEffect(() => {
        // Mock fetching stats
        setStats({
            students: 124,
            activeBookings: 15,
            revenue: "$12,450"
        });
    }, []);

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

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-white hidden md:block">
                <div className="p-6">
                    <h2 className="text-xl font-bold">SpeakPro Admin</h2>
                </div>
                <nav className="mt-6">
                    <a href="#" className="block px-6 py-3 bg-slate-700 border-l-4 border-brand-500">Dashboard</a>
                    <a href="#" className="block px-6 py-3 hover:bg-slate-700 text-gray-300">Students</a>
                    <a href="#" className="block px-6 py-3 hover:bg-slate-700 text-gray-300">Teachers</a>
                    <a href="#" className="block px-6 py-3 hover:bg-slate-700 text-gray-300">Bookings</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Administrator Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">{user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-800 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-gray-500 text-sm font-medium uppercase">Total Students</div>
                        <div className="mt-2 text-3xl font-bold text-brand-600">{stats.students}</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-gray-500 text-sm font-medium uppercase">Active Bookings</div>
                        <div className="mt-2 text-3xl font-bold text-brand-600">{stats.activeBookings}</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-gray-500 text-sm font-medium uppercase">Total Revenue</div>
                        <div className="mt-2 text-3xl font-bold text-green-600">{stats.revenue}</div>
                    </div>
                </div>

                {/* Recent Activity Mockup */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="font-bold text-gray-800">Recent Activity</h3>
                    </div>
                    <div className="p-6 text-gray-500 text-center italic">
                        No recent activity found.
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
