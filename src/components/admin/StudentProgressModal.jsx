import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabase';

const StudentProgressModal = ({ student, onClose, onUpdate }) => {
    const [level, setLevel] = useState(student.level || 'A1 Beginner');
    const [loading, setLoading] = useState(false);

    const levels = [
        'A1 Beginner',
        'A2 Elementary',
        'B1 Intermediate',
        'B2 Upper Intermediate',
        'C1 Advanced',
        'C2 Proficient'
    ];

    const handleSave = async () => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ level })
                .eq('id', student.id);

            if (error) throw error;

            onUpdate(); // Refresh list
            onClose();
        } catch (error) {
            console.error("Error updating student:", error);
            alert("Failed to update student level.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
                <div className="bg-brand-600 px-6 py-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Icon icon="mdi:school-outline" /> Student Progress
                    </h3>
                    <button onClick={onClose} className="hover:bg-brand-700 p-1 rounded-full transition-colors">
                        <Icon icon="mdi:close" className="text-xl" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-2xl font-bold">
                            {student.user_metadata?.full_name?.[0] || student.email[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {student.user_metadata?.full_name || "Student"}
                            </h2>
                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                <Icon icon="mdi:email-outline" /> {student.email}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                        <h4 className="text-xs uppercase font-bold text-gray-400 mb-3">Academic Stats</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Current Level</label>
                                <select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500"
                                >
                                    {levels.map(l => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Progress</label>
                                <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    {student.progress || 0}%
                                    <span className="text-xs font-normal text-gray-400">(Calculated)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading || level === student.level}
                            className="px-4 py-2 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Update Level'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProgressModal;
