import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(formatUser(session?.user));
            setLoading(false);
        });

        // 2. Listen for changes (Login/Logout/Auto-refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(formatUser(session?.user));
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Helper to format Supabase user to our App's shape
    const formatUser = (supabaseUser) => {
        if (!supabaseUser) return null;

        // Temporary: Determine role based on email until we have a 'profiles' table
        const isAdmin = supabaseUser.email?.includes('admin');

        return {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0],
            role: isAdmin ? 'admin' : 'student',
            level: "B2 Upper Intermediate" // Placeholder until DB fetch
        };
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return formatUser(data.user);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        // State update handled by onAuthStateChange
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
