import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const ReviewForm = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '' }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const { error } = await supabase
                .from('testimonials')
                .insert([
                    {
                        user_id: user.id,
                        full_name: user.name || user.email.split('@')[0],
                        rating,
                        content,
                        role: user.role === 'admin' ? 'Admin' : 'Student', // Simple role
                        is_featured: false // Default to false, require admin approval
                    }
                ]);

            if (error) throw error;

            setMessage({ type: 'success', text: 'Thank you for your feedback!' });
            setContent('');
            setRating(5);
        } catch (err) {
            console.error('Error submitting review:', err);
            setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Rate Your Experience</h3>

            {message && (
                <div className={`p-4 mb-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                    <Icon icon={message.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'} />
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-2xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300'
                                    } hover:scale-110`}
                            >
                                <Icon icon="mdi:star" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What do you think about the course?"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                        rows="4"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isSubmitting ? (
                        <Icon icon="mdi:loading" className="animate-spin text-2xl" />
                    ) : (
                        'Submit Review'
                    )}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
