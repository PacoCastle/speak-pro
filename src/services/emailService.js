import emailjs from '@emailjs/browser';

/**
 * Service to handle email sending logic using EmailJS.
 */
export const emailService = {
    /**
     * Sends a booking or contact email.
     * @param {Object} data - The form data to send.
     * @returns {Promise<Object>} - Response object.
     */
    sendEmail: async (data) => {
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceID || !templateID || !publicKey) {
            console.warn("EmailJS keys missing in .env. Falling back to mock implementation.");
            // Mock behavior for testing/local dev without keys
            await new Promise(resolve => setTimeout(resolve, 1500));
            return { success: true, message: 'Mock email sent successfully!' };
        }

        try {
            const response = await emailjs.send(
                serviceID,
                templateID,
                data,
                publicKey
            );
            console.log('EmailJS Success:', response.status, response.text);
            return { success: true, message: 'Email sent successfully!', status: response.status };
        } catch (error) {
            console.error('EmailJS Failed:', error);
            throw new Error('Failed to send email. Please try again later.');
        }
    }
};
