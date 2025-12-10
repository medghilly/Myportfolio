const { Resend } = require('resend');

const resend = new Resend('re_AaiYdb83_3VMZmE9vAoHwBo89vDrWpG8B');

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['mohamed.ghelli.elbou@gmail.com'],
      replyTo: email,
      subject: `Nouveau message de ${name} - Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Nouveau message depuis votre portfolio</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <div style="padding: 15px; background-color: #f5f5f5; border-left: 3px solid #007bff;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="margin-top: 20px;">
          <p style="color: #666; font-size: 12px;">Ce message a été envoyé depuis le formulaire de contact de votre portfolio.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data: data
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
};
