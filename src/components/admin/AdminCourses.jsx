import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

const AdminCourses = () => {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showArchived, setShowArchived] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, [showArchived]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('courses')
                .select('*')
                .order('created_at', { ascending: true });

            if (!showArchived) {
                query = query.eq('is_deleted', false);
            }

            const { data, error } = await query;
            if (error) throw error;
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSoftDelete = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        if (newStatus && !window.confirm("Are you sure you want to archive this course? It will be hidden from the public.")) {
            return;
        }

        try {
            const { error } = await supabase
                .from('courses')
                .update({ is_deleted: newStatus })
                .eq('id', id);

            if (error) throw error;
            fetchCourses();
        } catch (error) {
            console.error("Error updating course status:", error);
            alert(`Failed to update status: ${error.message}`);
        }
    };

    const handleToggleVisibility = async (id, currentVisibility) => {
        try {
            const { error } = await supabase
                .from('courses')
                .update({ is_visible: !currentVisibility })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setCourses(courses.map(c => c.id === id ? { ...c, is_visible: !currentVisibility } : c));
        } catch (error) {
            console.error("Error updating visibility:", error);
            alert(`Failed to hide/show: ${error.message}`);
        }
    };

    const handleEditClick = (course) => {
        setEditingId(course.id);
        setEditForm(course);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async () => {
        try {
            const { error } = await supabase
                .from('courses')
                .update({
                    price: editForm.price,
                    description: editForm.description,
                    title: editForm.title
                })
                .eq('id', editingId);

            if (error) throw error;

            setCourses(courses.map(c => c.id === editingId ? { ...c, ...editForm } : c));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating course:", error);
            alert("Failed to update course");
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Courses...</div>;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold text-gray-800">Manage Courses</h3>
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
                <button className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
                    <Icon icon="mdi:plus" /> Add Course
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
                        <tr>
                            <th className="px-6 py-3">Course</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Description key/text</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {courses.map((course) => {
                            const isEditing = editingId === course.id;

                            return (
                                <tr key={course.id} className={`hover:bg-gray-50 align-top ${course.is_deleted ? 'bg-red-50' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={course.image_url || "https://via.placeholder.com/150"} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                            <div>
                                                {isEditing ? (
                                                    <input
                                                        className="border rounded px-2 py-1 text-sm w-full"
                                                        value={editForm.title}
                                                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                                    />
                                                ) : (
                                                    <p className="font-bold text-gray-900">{t(course.title)}</p>
                                                )}

                                                <p className="text-xs text-gray-400">{isEditing ? '' : course.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {isEditing ? (
                                            <input
                                                className="border rounded px-2 py-1 text-sm w-24"
                                                value={editForm.price}
                                                onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                            />
                                        ) : (
                                            <span className="font-mono text-brand-600 bg-brand-50 px-2 py-1 rounded">
                                                {t(course.price)}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate">
                                        {isEditing ? (
                                            <textarea
                                                className="border rounded px-2 py-1 text-sm w-full"
                                                rows={3}
                                                value={editForm.description}
                                                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                            />
                                        ) : (
                                            <span title={t(course.description)}>{t(course.description)}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1 items-start">
                                            {course.is_deleted && <span className="text-xs bg-red-100 text-red-600 px-1 rounded">Archived</span>}
                                            {!course.is_visible && !course.is_deleted && <span className="text-xs bg-gray-100 text-gray-600 px-1 rounded">Hidden</span>}
                                            {course.is_visible && !course.is_deleted && <span className="text-xs bg-green-100 text-green-600 px-1 rounded">Active</span>}
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
                                                {!course.is_deleted && (
                                                    <>
                                                        <button
                                                            onClick={() => handleToggleVisibility(course.id, course.is_visible)}
                                                            className={`text-xl ${course.is_visible ? 'text-gray-400 hover:text-brand-600' : 'text-gray-400 hover:text-green-600'}`}
                                                            title={course.is_visible ? "Hide" : "Show"}
                                                        >
                                                            <Icon icon={course.is_visible ? "mdi:eye" : "mdi:eye-off"} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditClick(course)}
                                                            className="text-brand-600 hover:text-brand-800 transition-colors"
                                                        >
                                                            <Icon icon="mdi:pencil" className="text-xl" />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => handleSoftDelete(course.id, course.is_deleted)}
                                                    className={`${course.is_deleted ? 'text-green-500 hover:text-green-700' : 'text-red-400 hover:text-red-600'}`}
                                                    title={course.is_deleted ? "Restore" : "Archive"}
                                                >
                                                    <Icon icon={course.is_deleted ? "mdi:restore" : "mdi:trash-can-outline"} className="text-xl" />
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
export default AdminCourses;
