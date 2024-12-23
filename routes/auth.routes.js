const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Register user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    res.status(201).json({
      message: 'User registered successfully',
      result: true,
      data: { userId: user._id }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      result: false
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: 'Invalid credentials',
        result: false
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    user.refreshToken = refreshToken;
    user.refreshTokenExpiryTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await user.save();

    res.json({
      message: 'Login successful',
      result: true,
      data: {
        token,
        refreshToken,
        user: {
          userId: user._id,
          userName: user.userName,
          emailId: user.emailId,
          fullName: user.fullName,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      result: false
    });
  }
});

module.exports = router;