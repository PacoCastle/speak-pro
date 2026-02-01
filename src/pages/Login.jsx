import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Navbar from '../components/layout/Navbar';
// Reusing Navbar mainly for the logo/consistency, though it might show links that jump to anchors.

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const user = await login(email, password);
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch {
            setError('Invalid credentials. Try using any email/password for this demo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-20 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <Icon icon="mdi:school-outline" className="text-6xl text-brand-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 font-display">Welcome Back</h2>
                        <p className="text-gray-500 mt-2">Access your personalized learning dashboard</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                            <Icon icon="mdi:alert-circle" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Icon icon="mdi:email-outline" className="absolute left-3 top-3 text-gray-400 text-xl" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                    placeholder="student@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Icon icon="mdi:lock-outline" className="absolute left-3 top-3 text-gray-400 text-xl" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-brand-600 text-white font-bold py-3 rounded-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Logging in...' : 'Sign In'}
                            {!isSubmitting && <Icon icon="mdi:arrow-right" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/#contact" className="text-brand-600 font-bold hover:underline">Book a trial</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
