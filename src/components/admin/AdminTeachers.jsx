import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { teachers as initialTeachers } from '../../data/teachers';

const AdminTeachers = () => {
    const [teachers, setTeachers] = useState(initialTeachers);
    const [isAdding, setIsAdding] = useState(false);
    const [newTeacherName, setNewTeacherName] = useState('');

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this teacher?")) {
            setTeachers(teachers.filter(t => t.id !== id));
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const newTeacher = {
            id: `teacher-${Date.now()}`,
            name: newTeacherName,
            role: "teachers.new.role",
            exp: "1 Year",
            image: "https://via.placeholder.com/150",
            flag: "us",
            tags: []
        };
        setTeachers([...teachers, newTeacher]);
        setNewTeacherName('');
        setIsAdding(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg">Manage Teachers</h3>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-700 flex items-center gap-2"
                >
                    <Icon icon="mdi:plus" /> Add Teacher
                </button>
            </div>

            {/* Add Teacher Form */}
            {isAdding && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 animate-fade-in">
                    <form onSubmit={handleAdd} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Teacher Name"
                            className="flex-1 border border-gray-300 rounded px-3 py-2"
                            value={newTeacherName}
                            onChange={(e) => setNewTeacherName(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-bold text-sm">Save</button>
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-bold text-sm"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* Teachers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachers.map((teacher) => (
                    <div key={teacher.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
                        <img src={teacher.image} alt={teacher.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{teacher.name}</h4>
                            <p className="text-xs text-gray-500">{teacher.role}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(teacher.id)}
                            className="text-red-400 hover:text-red-600 p-2"
                            title="Remove Teacher"
                        >
                            <Icon icon="mdi:trash-can-outline" className="text-xl" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTeachers;
