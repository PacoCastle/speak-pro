import { useCallback } from 'react';

/**
 * Custom hook to handle smooth scrolling to elements
 * @returns {Function} scrollTo function
 */
export const useScrollTo = () => {
    const scrollTo = useCallback((elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return scrollTo;
};
