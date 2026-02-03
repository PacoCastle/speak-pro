import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabase';
import { addTeacher } from '../../services/teacherService';
import { useTranslation } from 'react-i18next';

const AdminTeachers = () => {
    const { t } = useTranslation();
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newTeacherName, setNewTeacherName] = useState('');
    const [showArchived, setShowArchived] = useState(false);

    // Edit State
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        loadData();
    }, [showArchived]);

    const loadData = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('teachers')
                .select('*')
                .order('created_at', { ascending: false });

            if (!showArchived) {
                query = query.eq('is_deleted', false);
            }

            const { data, error } = await query;
            if (error) throw error;
            setTeachers(data);
        } catch (error) {
            console.error("Error loading teachers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSoftDelete = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        if (newStatus && !window.confirm("Are you sure you want to archive this teacher? They will be hidden from the public.")) {
            return;
        }

        try {
            const { error } = await supabase
                .from('teachers')
                .update({ is_deleted: newStatus })
                .eq('id', id);

            if (error) throw error;
            loadData();
        } catch (error) {
            console.error("Error updating teacher status:", error);
            alert(`Failed to update status: ${error.message || "Permission Denied?"}`);
        }
    };

    const handleToggleVisibility = async (id, currentVisibility) => {
        try {
            const { error } = await supabase
                .from('teachers')
                .update({ is_visible: !currentVisibility })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setTeachers(teachers.map(t => t.id === id ? { ...t, is_visible: !currentVisibility } : t));
        } catch (error) {
            console.error("Error updating visibility:", error);
            alert(`Failed to hide/show: ${error.message || "Permission Denied?"}`);
            // Revert optimistic update if needed, or just let the loadData refresh eventually
        }
    };

    const handleEditClick = (teacher) => {
        setEditingId(teacher.id);
        setEditForm(teacher);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async () => {
        try {
            const { error } = await supabase
                .from('teachers')
                .update({
                    name: editForm.name,
                    exp: editForm.exp,
                    role_key: editForm.role_key,
                    bio_key: editForm.bio_key
                })
                .eq('id', editingId);

            if (error) throw error;

            setTeachers(teachers.map(t => t.id === editingId ? { ...t, ...editForm } : t));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating teacher:", error);
            alert("Failed to update teacher");
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await addTeacher({
                name: newTeacherName,
                role_key: "teachers.new.role",
                bio_key: "teachers.new.bio",
                exp: "1 Year",
                image_url: "https://via.placeholder.com/150",
                flag_code: "us",
                tags: []
            });
            setNewTeacherName('');
            setIsAdding(false);
            loadData();
        } catch (error) {
            console.error("Failed to add teacher", error);
            alert("Error adding teacher: " + error.message);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Teachers...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold text-gray-800 text-lg">Manage Teachers</h3>
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
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-700 flex items-center gap-2"
                >
                    <Icon icon="mdi:plus" /> Add Teacher
                </button>
            </div>

            {/* Add Teacher Form */}
            {isAdding && (
                <div className="bg-gray-50 border-b border-gray-200 p-4 animate-fade-in">
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

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
                        <tr>
                            <th className="px-6 py-3">Teacher</th>
                            <th className="px-6 py-3">Experience</th>
                            <th className="px-6 py-3">Bio / Role Key</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {teachers.map((teacher) => {
                            const isEditing = editingId === teacher.id;

                            return (
                                <tr key={teacher.id} className={`hover:bg-gray-50 align-top ${teacher.is_deleted ? 'bg-red-50 hover:bg-red-100' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={teacher.image_url || "https://via.placeholder.com/150"}
                                                alt={teacher.name}
                                                className="w-10 h-10 rounded-full object-cover bg-gray-200"
                                            />
                                            <div className="flex-1">
                                                {isEditing ? (
                                                    <div className="space-y-1">
                                                        <input
                                                            className="border rounded px-2 py-1 text-sm w-full block"
                                                            value={editForm.name}
                                                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                                            placeholder="Name"
                                                        />
                                                        <input
                                                            className="border rounded px-2 py-1 text-xs w-full block"
                                                            value={editForm.role_key}
                                                            onChange={e => setEditForm({ ...editForm, role_key: e.target.value })}
                                                            placeholder="Role Key"
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h4 className="font-bold text-gray-900 line-clamp-1">{teacher.name}</h4>
                                                        <p className="text-xs text-gray-500">{t(teacher.role_key)}</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {isEditing ? (
                                            <input
                                                className="border rounded px-2 py-1 text-sm w-24"
                                                value={editForm.exp}
                                                onChange={e => setEditForm({ ...editForm, exp: e.target.value })}
                                            />
                                        ) : (
                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{teacher.exp}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate">
                                        {isEditing ? (
                                            <textarea
                                                className="border rounded px-2 py-1 text-sm w-full"
                                                rows={2}
                                                value={editForm.bio_key}
                                                onChange={e => setEditForm({ ...editForm, bio_key: e.target.value })}
                                                placeholder="Bio Key"
                                            />
                                        ) : (
                                            <span title={t(teacher.bio_key)} className="text-xs">{t(teacher.bio_key)}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1 items-start">
                                            {teacher.is_deleted && <span className="text-xs bg-red-100 text-red-600 px-1 rounded">Archived</span>}
                                            {!teacher.is_visible && !teacher.is_deleted && <span className="text-xs bg-gray-100 text-gray-600 px-1 rounded">Hidden</span>}
                                            {teacher.is_visible && !teacher.is_deleted && <span className="text-xs bg-green-100 text-green-600 px-1 rounded">Active</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        {isEditing ? (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                                                    <Icon icon="mdi:check-circle" className="text-2xl" />
                                                </button>
                                                <button onClick={handleCancelEdit} className="text-gray-400 hover:text-gray-600">
                                                    <Icon icon="mdi:close-circle" className="text-2xl" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end items-center gap-2">
                                                {!teacher.is_deleted && (
                                                    <>
                                                        <button
                                                            onClick={() => handleToggleVisibility(teacher.id, teacher.is_visible)}
                                                            className={`text-xl ${teacher.is_visible ? 'text-gray-400 hover:text-brand-600' : 'text-gray-400 hover:text-green-600'}`}
                                                            title={teacher.is_visible ? "Hide" : "Show"}
                                                        >
                                                            <Icon icon={teacher.is_visible ? "mdi:eye" : "mdi:eye-off"} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditClick(teacher)}
                                                            className="text-brand-600 hover:text-brand-800 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Icon icon="mdi:pencil" className="text-xl" />
                                                        </button>
                                                    </>
                                                )}

                                                <button
                                                    onClick={() => handleSoftDelete(teacher.id, teacher.is_deleted)}
                                                    className={`${teacher.is_deleted ? 'text-green-500 hover:text-green-700' : 'text-red-400 hover:text-red-600'}`}
                                                    title={teacher.is_deleted ? "Restore" : "Archive"}
                                                >
                                                    <Icon icon={teacher.is_deleted ? "mdi:restore" : "mdi:trash-can-outline"} className="text-xl" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminTeachers;
