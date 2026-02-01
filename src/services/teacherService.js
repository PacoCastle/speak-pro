
import { supabase } from '../lib/supabase';
import { teachers as fallbackTeachers } from '../data/teachers';

export const getTeachers = async () => {
    try {
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .order('name');

        if (error) throw error;

        if (!data || data.length === 0) {
            console.warn("No teachers found in DB, using fallback.");
            return fallbackTeachers;
        }

        return data.map(t => ({
            ...t,
            id: t.id,
            name: t.name,
            role: t.role_key,
            bio: t.bio_key,
            flag: t.flag_code,
            image: t.image_url,
            tags: t.tags || []
        }));
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return fallbackTeachers;
    }
};

export const deleteTeacher = async (id) => {
    const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

export const addTeacher = async (teacher) => {
    const { data, error } = await supabase
        .from('teachers')
        .insert([{
            name: teacher.name,
            role_key: teacher.role,
            bio_key: 'teachers.new.bio', // Default/Placeholder
            exp: teacher.exp,
            image_url: teacher.image,
            flag_code: teacher.flag,
            tags: teacher.tags
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};
