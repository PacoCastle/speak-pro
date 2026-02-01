/**
 * Service to handle email sending logic.
 * Currently uses a mock implementation.
 * Can be easily swapped with EmailJS or a backend API.
 */

export const emailService = {
    /**
     * Sends a booking or contact email.
     * @param {Object} data - The form data to send.
     * @returns {Promise<Object>} - Response object.
     */
    sendEmail: async (data) => {
        console.log('Attemping to send email with data:', data);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate success (90% chance) or random failure (10% chance) for robustness testing?
        // For MVP, we'll assume success to keep tests stable.
        const success = true;

        if (success) {
            console.log('Email sent successfully!');
            return { success: true, message: 'Email sent successfully!' };
        } else {
            console.error('Failed to send email.');
            throw new Error('Failed to send email. Please try again.');
        }
    }
};
