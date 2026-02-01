import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([
        { id: 101, user: "John Doe", email: "john@test.com", date: "2024-02-15", time: "Morning", status: "Pending" },
        { id: 102, user: "Alice Smith", email: "alice@test.com", date: "2024-02-16", time: "Afternoon", status: "Approved" },
        { id: 103, user: "Bob Brown", email: "bob@test.com", date: "2024-02-18", time: "Morning", status: "Rejected" },
    ]);

    const handleAction = (id, newStatus) => {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Placement Test Requests</h3>
            </div>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id} className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900">{booking.user}</span>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 flex items-center gap-4">
                                    <span className="flex items-center gap-1"><Icon icon="mdi:email-outline" /> {booking.email}</span>
                                    <span className="flex items-center gap-1"><Icon icon="mdi:calendar" /> {booking.date} ({booking.time})</span>
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
        </div>
    );
};

export default AdminBookings;
