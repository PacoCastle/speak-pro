import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { getBookings, updateBookingStatus } from '../../services/bookingService';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getBookings();
            setBookings(data);
        } catch (error) {
            console.error("Error loading bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, newStatus) => {
        try {
            await updateBookingStatus(id, newStatus);
            loadData(); // Refresh list to show updated status
        } catch (error) {
            alert("Error updating status: " + error.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) return <div>Loading Bookings...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Placement Test Requests</h3>
            </div>
            {bookings.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No bookings found.</div>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id} className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">{booking.user_name || "Unknown User"}</span>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-4">
                                        <span className="flex items-center gap-1"><Icon icon="mdi:email-outline" /> {booking.user_email}</span>
                                        <span className="flex items-center gap-1"><Icon icon="mdi:calendar" /> {booking.date} ({booking.time_slot})</span>
                                    </div>
                                </div>

                                {booking.status === 'Pending' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAction(booking.id, 'Approved')}
                                            className="px-3 py-1.5 bg-green-50 text-green-600 font-bold text-sm rounded hover:bg-green-100 flex items-center gap-1"
                                        >
                                            <Icon icon="mdi:check" /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(booking.id, 'Rejected')}
                                            className="px-3 py-1.5 bg-red-50 text-red-600 font-bold text-sm rounded hover:bg-red-100 flex items-center gap-1"
                                        >
                                            <Icon icon="mdi:close" /> Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminBookings;
