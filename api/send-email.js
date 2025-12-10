const fs = require('fs');
const path = require('path');

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

    // Create contact message object
    const contactMessage = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
    };

    // Path to messages file
    const messagesFile = path.join(process.cwd(), 'messages.json');

    // Read existing messages
    let messages = [];
    if (fs.existsSync(messagesFile)) {
      const data = fs.readFileSync(messagesFile, 'utf8');
      messages = JSON.parse(data);
    }

    // Add new message
    messages.push(contactMessage);

    // Save to file
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Message saved successfully',
      data: contactMessage
    });
  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({ error: 'Failed to save message', details: error.message });
  }
};
