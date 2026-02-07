import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabase';

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showArchived, setShowArchived] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, [showArchived]);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (!showArchived) {
                query = query.eq('is_deleted', false);
            }

            const { data, error } = await query;
            if (error) throw error;
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSoftDelete = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        if (newStatus && !window.confirm("Are you sure you want to archive this testimonial?")) {
            return;
        }

        try {
            const { error } = await supabase
                .from('testimonials')
                .update({ is_deleted: newStatus })
                .eq('id', id);

            if (error) throw error;
            fetchTestimonials();
        } catch (error) {
            console.error("Error updating testimonial status:", error);
            alert("Failed to update status");
        }
    };

    const handleToggleVisibility = async (id, currentVisibility) => {
        try {
            const { error } = await supabase
                .from('testimonials')
                .update({ is_visible: !currentVisibility })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_visible: !currentVisibility } : t));
        } catch (error) {
            console.error("Error updating visibility:", error);
        }
    };

    const handleToggleFeatured = async (id, currentFeatured) => {
        try {
            const { error } = await supabase
                .from('testimonials')
                .update({ is_featured: !currentFeatured })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_featured: !currentFeatured } : t));
        } catch (error) {
            console.error("Error updating featured status:", error);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Testimonials...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold text-gray-800 text-lg">Manage Testimonials</h3>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showArchived}
                            onChange={(e) => setShowArchived(e.target.checked)}
                            className="rounded text-brand-600 focus:ring-brand-500"
                        />
                        Show Archived
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((review) => (
                    <div key={review.id} className={`bg-white p-6 rounded-lg shadow-sm border ${review.is_deleted ? 'border-red-200 bg-red-50 opacity-75' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                {review.image_url ? (
                                    <img src={review.image_url} alt={review.full_name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold">
                                        {review.full_name?.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-gray-900 line-clamp-1">{review.full_name}</h4>
                                    <p className="text-xs text-gray-500">{review.role || 'Student'}</p>
                                </div>
                            </div>
                            <div className="flex text-yellow-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <Icon key={i} icon={i < review.rating ? "mdi:star" : "mdi:star-outline"} />
                                ))}
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 min-h-[60px]">{review.content}</p>

                        <div className="flex items-center justify-between border-t pt-4">
                            <div className="flex gap-2">
                                {review.is_deleted && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Archived</span>}
                                {!review.is_visible && !review.is_deleted && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Hidden</span>}
                                {review.is_visible && !review.is_deleted && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Visible</span>}
                                {review.is_featured && <span className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded">Featured</span>}
                            </div>

                            <div className="flex gap-2">
                                {!review.is_deleted && (
                                    <>
                                        <button
                                            onClick={() => handleToggleFeatured(review.id, review.is_featured)}
                                            className={`p-1.5 rounded hover:bg-gray-100 ${review.is_featured ? 'text-yellow-500' : 'text-gray-400'}`}
                                            title="Toggle Featured"
                                        >
                                            <Icon icon={review.is_featured ? "mdi:star" : "mdi:star-outline"} className="text-xl" />
                                        </button>
                                        <button
                                            onClick={() => handleToggleVisibility(review.id, review.is_visible)}
                                            className={`p-1.5 rounded hover:bg-gray-100 ${review.is_visible ? 'text-gray-400' : 'text-gray-400'}`}
                                            title={review.is_visible ? "Hide" : "Show"}
                                        >
                                            <Icon icon={review.is_visible ? "mdi:eye" : "mdi:eye-off"} className="text-xl" />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => handleSoftDelete(review.id, review.is_deleted)}
                                    className={`p-1.5 rounded hover:bg-gray-100 ${review.is_deleted ? 'text-green-600' : 'text-red-400'}`}
                                    title={review.is_deleted ? "Restore" : "Archive"}
                                >
                                    <Icon icon={review.is_deleted ? "mdi:restore" : "mdi:trash-can-outline"} className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTestimonials;
