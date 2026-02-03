import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { createBooking, getBookings } from '../../services/bookingService';
import { emailService } from '../../services/emailService';

const BookingModal = ({ isOpen, onClose, defaultType = "Adults" }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: defaultType,
        date: new Date().toISOString().split('T')[0], // Default today
        time_slot: 'Morning'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Check for existing pending bookings for this email
            const existingBookings = await getBookings(); // This might be overkill to fetch all, but RLS protects it or we should add a filter method.
            // Ideally we'd have getBookingsByEmail but getBookings returns everything for now (or filtered by RLS).
            // Let's assume getBookings returns what the user can see (own bookings) or we filter.
            // If public (not logged in), we can't easily check without an API.
            // For now, let's just proceed with creation, but maybe show a message if it fails due to logic.

            // 1. Save to Database
            await createBooking({
                name: formData.name,
                email: formData.email,
                date: formData.date,
                time_slot: formData.time_slot
            });

            // 2. Send Confirmation Email (Mock)
            await emailService.sendEmail(formData);

            setStep(2);
        } catch (error) {
            console.error("Booking failed:", error);
            if (error.message.includes("duplicate")) {
                alert("You already have a booking request!");
            } else {
                alert("Booking failed: " + error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 z-10">
                        <Icon icon="mdi:close" className="text-gray-500 text-xl" />
                    </button>

                    <div className="p-8">
                        {step === 1 ? (
                            <>
                                <div className="mb-6 text-center">
                                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon icon="mdi:calendar-check" className="text-3xl text-brand-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Book Placement Test</h3>
                                    <p className="text-gray-500 mt-2">Free 15-minute level assessment for {defaultType}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                            <select
                                                value={formData.time_slot}
                                                onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
                                            >
                                                <option value="Morning">Morning</option>
                                                <option value="Afternoon">Afternoon</option>
                                                <option value="Evening">Evening</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <Icon icon="mdi:loading" className="animate-spin" /> : 'Confirm Booking'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <Icon icon="mdi:check-circle" className="text-6xl text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                                <p className="text-gray-500 mb-8">We've sent a confirmation email to <strong>{formData.email}</strong>.</p>
                                <button onClick={onClose} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl">Done</button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;
