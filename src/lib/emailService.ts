import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Debug: Log configuration status (remove in production)
console.log('EmailJS Config:', {
  hasServiceId: !!EMAILJS_CONFIG.serviceId,
  hasTemplateId: !!EMAILJS_CONFIG.templateId,
  hasPublicKey: !!EMAILJS_CONFIG.publicKey,
});

// Initialize EmailJS with public key
if (EMAILJS_CONFIG.publicKey) {
  emailjs.init(EMAILJS_CONFIG.publicKey);
} else {
  console.error('EmailJS public key is missing!');
}

export interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Send an email using EmailJS service
 * @param formData - The form data containing name, email, and message
 * @returns Promise that resolves when email is sent successfully
 * @throws Error if email sending fails
 */
export const sendContactEmail = async (formData: EmailFormData): Promise<void> => {
  // Validate configuration
  if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
    throw new Error(
      'EmailJS configuration is missing. Please check your .env file and ensure all EmailJS credentials are set.'
    );
  }

  try {
    // Template parameters that will be used in EmailJS template
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error(`Email sending failed with status: ${response.status}`);
    }

    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send email:', error);

    // Provide user-friendly error message
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`);
    } else {
      throw new Error('Failed to send email. Please try again later.');
    }
  }
};

// Export configuration for debugging purposes (only in development)
export const getEmailConfig = () => {
  if (import.meta.env.DEV) {
    return {
      hasServiceId: !!EMAILJS_CONFIG.serviceId,
      hasTemplateId: !!EMAILJS_CONFIG.templateId,
      hasPublicKey: !!EMAILJS_CONFIG.publicKey,
      isConfigured: !!(EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey),
    };
  }
  return null;
};
