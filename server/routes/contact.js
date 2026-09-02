const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

function buildTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const secure = process.env.SMTP_SECURE === 'true';

  if (!user || !pass) return null;

  if (host && port) {
    return nodemailer.createTransport({ host, port: Number(port), secure, auth: { user, pass } });
  }
  // Default to Gmail's SMTP (requires an app password)
  return nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
}

async function sendEmail({ name, email, subject, message }) {
  const transporter = buildTransporter();
  if (!transporter) {
    console.warn('[contact] Email skipped: EMAIL_USER / EMAIL_PASS not set (see server/.env.example)');
    return;
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_RECIPIENT || process.env.EMAIL_USER,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`
  };
  await transporter.sendMail(mailOptions);
  console.log('[contact] Email delivered to', mailOptions.to);
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

    // Email is a notification channel; a failure here must not reject the recruiter.
    // The message is already stored, so we always respond success.
    sendEmail({ name, email, subject, message }).catch((err) => {
      console.error('[contact] Email sending failed (message is saved in MongoDB):', err.message);
    });

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;