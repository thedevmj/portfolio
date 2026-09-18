const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { createBlueprint, getCapabilities } = require('../controller/Aicontroller');

// Protect AI generation with rate limiting
const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30, // 30 requests per 10 mins
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many AI requests. Please wait a few moments.' }
});

router.post('/blueprint', aiLimiter, createBlueprint);
router.post('/generate', aiLimiter, createBlueprint);
router.post('/chat', aiLimiter, createBlueprint);
router.get('/capabilities', getCapabilities);

module.exports = router;
