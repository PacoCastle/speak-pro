import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Navbar from '../components/layout/Navbar';
import SEO from '../components/common/SEO';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await signup(email, password, name);
            // If email confirmation is enabled, user might be created but not logged in (no session).
            // We should show a success message regardless.
            setRegistrationSuccess(true);
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || 'Failed to create account.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (registrationSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <SEO title="Sign Up | SpeakPro Academy" />
                <Navbar />
                <div className="flex-grow flex items-center justify-center pt-20 px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon icon="mdi:email-check-outline" className="text-4xl text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 font-display mb-4">Check your email!</h2>
                        <p className="text-gray-500 mb-8">
                            We've sent a confirmation link to <span className="font-bold text-gray-800">{email}</span>.
                            <br />Please click the link to activate your account.
                        </p>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-brand-600 font-bold hover:underline"
                        >
                            <Icon icon="mdi:arrow-left" /> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <SEO title="Sign Up | SpeakPro Academy" />
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-20 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <Icon icon="mdi:account-plus-outline" className="text-6xl text-brand-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-900 font-display">Join SpeakPro</h2>
                        <p className="text-gray-500 mt-2">Start your journey to fluency today</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                            <Icon icon="mdi:alert-circle" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <Icon icon="mdi:account-outline" className="absolute left-3 top-3 text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

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
                                    minLength={6}
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
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                            {!isSubmitting && <Icon icon="mdi:arrow-right" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account? <Link to="/login" className="text-brand-600 font-bold hover:underline">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
