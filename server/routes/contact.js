const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

async function sendEmail({ name, email, subject, message }) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.warn('[contact] Email skipped: WEB3FORMS_ACCESS_KEY not set');
    return;
  }

  console.log('[contact] Sending email via Web3Forms...');

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      subject: `Portfolio Contact: ${subject}`,
      message
    })
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || 'Web3Forms submission failed');
  }

  console.log('[contact] Email sent successfully via Web3Forms');
}

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
  }

  try {
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    console.log('[contact] Saved to MongoDB:', contact._id);

    sendEmail({ name, email, subject, message }).catch((err) => {
      console.error('[contact] Email failed (message saved in MongoDB):', err.message);
    });

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
