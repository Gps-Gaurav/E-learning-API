const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollment.model');
const authMiddleware = require('../middleware/auth.middleware');

// Enroll in course
router.post('/', authMiddleware, async (req, res) => {
  try {
    const enrollment = new Enrollment({
      userId: req.user.userId,
      courseId: req.body.courseId
    });
    await enrollment.save();
    
    res.status(201).json({
      message: 'Enrolled successfully',
      result: true,
      data: enrollment
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      result: false
    });
  }
});

// Get user enrollments
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.userId })
      .populate('courseId');
    
    res.json({
      message: 'Enrollments retrieved successfully',
      result: true,
      data: enrollments
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      result: false
    });
  }
});

module.exports = router;