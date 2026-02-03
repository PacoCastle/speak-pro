import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabase';

const AdminStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .order('email');

                if (error) throw error;
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Students...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Enrolled Students</h3>
                <button className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
                    <Icon icon="mdi:download" /> Export CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
                        <tr>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Level</th>
                            <th className="px-6 py-3">Progress</th>
                            <th className="px-6 py-3">Joined</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{student.email}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">
                                        {student.level || 'A1 Beginner'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-24 bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: `${student.progress || 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-400 mt-1 block">{student.progress || 0}%</span>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-500">
                                    {/* Profiles table doesn't have created_at yet? It has updated_at. Using updated_at or empty for now. */}
                                    {student.updated_at ? new Date(student.updated_at).toLocaleDateString() : '-'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-brand-600 transition-colors">
                                        <Icon icon="mdi:dots-vertical" className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {students.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStudents;
