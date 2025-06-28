// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User'); // Sequelize User model

// ✅ Route to initiate Google authentication
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// ✅ Google callback route after successful login
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/',
    successRedirect: 'http://localhost:3000/dashboard'
  })
);

// ✅ Optional: Fetch all users (for debugging via Postman)
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('❌ Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
