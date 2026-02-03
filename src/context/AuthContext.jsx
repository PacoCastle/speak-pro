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
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            const formatted = await formatUser(session?.user);
            setUser(formatted);
            setLoading(false);
        });

        // 2. Listen for changes (Login/Logout/Auto-refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const formatted = await formatUser(session?.user);
            setUser(formatted);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Helper to format Supabase user to our App's shape
    const formatUser = async (supabaseUser) => {
        if (!supabaseUser) return null;

        // Determine role based on email until we have a 'profiles' table
        const isAdmin = supabaseUser.email?.includes('admin');

        // Fetch Profile Data
        let profile = null;
        if (!isAdmin) {
            const { data } = await supabase
                .from('profiles')
                .select('level, progress')
                .eq('id', supabaseUser.id)
                .single();
            profile = data;
        }

        return {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0],
            role: isAdmin ? 'admin' : 'student',
            level: profile?.level || "A1 Beginner",
            progress: profile?.progress || 0
        };
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return await formatUser(data.user);
    };

    const signup = async (email, password, fullName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) throw error;
        return await formatUser(data.user);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        // State update handled by onAuthStateChange
    };

    const value = {
        user,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
