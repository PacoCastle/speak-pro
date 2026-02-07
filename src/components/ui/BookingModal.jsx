import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { createBooking } from '../../services/bookingService';

const BookingModal = ({ isOpen, onClose }) => {

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                "theme": "light",
                "styles": {
                    "branding": {
                        "brandColor": "#000000"
                    }
                },
                "hideEventTypeDetails": false,
                "layout": "month_view"
            });

            cal("on", {
                action: "bookingSuccessful",
                callback: async (e) => {
                    console.log("Cal.com Booking Success:", e.detail);
                    const { data } = e.detail;

                    try {
                        // Sync with our Supabase DB so dashboard still works
                        await createBooking({
                            name: data.confirmingUser?.name || "Student",
                            email: data.confirmingUser?.email || "unknown@email.com",
                            date: data.date,
                            time_slot: "Cal.com Booking", // Simplified as Cal handles time
                            status: "Approved" // Cal bookings are auto-approved usually
                        });
                        // Optional: Close modal after delay or show success screen
                        // For now, Cal.com shows its own success screen.
                    } catch (error) {
                        console.error("Failed to sync booking:", error);
                    }
                }
            });
        })();
    }, [isOpen]);

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
                    className="relative bg-white rounded-2xl w-full max-w-4xl h-[90vh] shadow-2xl overflow-hidden flex flex-col"
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-bold text-gray-800">Book Placement Test</h3>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                            <Icon icon="mdi:close" className="text-gray-500 text-xl" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto bg-gray-50">
                        <Cal
                            calLink={import.meta.env.VITE_CAL_LINK || "castillo-fj-hotmail.com/30-min-placement"}
                            style={{ width: "100%", height: "100%", overflow: "scroll" }}
                            config={{ layout: 'month_view' }}
                        />
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;
