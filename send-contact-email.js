// send-contact-email.js
// Node.js Express serverless handler for contact form
// Uses SendGrid for secure, production-ready email delivery

const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key securely (use environment variable in production)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/send-contact-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Sanitize input (basic)
  const safeName = String(name).replace(/[^\w\s\-\.]/g, '');
  const safeEmail = String(email).replace(/[^\w@\.\-]/g, '');
  const safeMessage = String(message).replace(/<[^>]*>?/gm, '');

  const msg = {
    to: 'nikohlcreations@gmail.com', // Your email
    from: 'no-reply@nikohlcreations.com', // Verified sender
    subject: `New Contact Form Submission from ${safeName}`,
    text: `Name: ${safeName}\nEmail: ${safeEmail}\nMessage: ${safeMessage}`,
    html: `<strong>Name:</strong> ${safeName}<br><strong>Email:</strong> ${safeEmail}<br><strong>Message:</strong><br>${safeMessage}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('SendGrid error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
