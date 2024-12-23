const express = require('express');
const router = express.Router();
const OnlineLearningController = require('../controllers/onlineLearning.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/GetAllCourse', OnlineLearningController.getAllCourse);
router.post('/login', OnlineLearningController.login);
router.post('/AddNewUser', OnlineLearningController.addNewUser);

// Protected routes
router.get('/GetCourseVideosbyCourseId', authMiddleware, OnlineLearningController.getCourseVideosbyCourseId);
router.post('/CreateNewEnrollment', authMiddleware, OnlineLearningController.createNewEnrollment);
router.get('/GetEnrolledCourseByUserId', authMiddleware, OnlineLearningController.getEnrolledCourseByUserId);

module.exports = router;