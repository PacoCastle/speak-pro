
import { supabase } from '../lib/supabase';

export const getBookings = async () => {
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
};

export const createBooking = async (booking) => {
    // booking = { name, email, date, time_slot }
    const { data, error } = await supabase
        .from('bookings')
        .insert([{
            user_email: booking.email,
            user_name: booking.name,
            date: booking.date,
            time_slot: booking.time_slot,
            status: 'Pending'
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const updateBookingStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};
