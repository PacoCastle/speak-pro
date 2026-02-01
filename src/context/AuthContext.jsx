import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Lazy initialization to avoid useEffect for initial state
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('speakpro_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        // Mock Login Logic
        // In a real app, this would call your API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setLoading(false);
                if (email && password) {
                    const mockUser = { id: 1, name: "Student", email, level: "B2 Upper Intermediate" };
                    setUser(mockUser);
                    localStorage.setItem('speakpro_user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('speakpro_user');
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
