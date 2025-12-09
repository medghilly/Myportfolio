export interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (formData: EmailFormData): Promise<void> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email API Error:', errorData);
      throw new Error(`Email sending failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Email Error:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};
