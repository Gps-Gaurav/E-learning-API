const Course = require('../models/course.model');
const CourseVideo = require('../models/courseVideo.model');
const express = require('express');
const router = express.Router();

// Log route access
router.use((req, res, next) => {
    console.log(`
[Course Route Access]
Timestamp: 2024-12-23 00:23:52 UTC
User: Gps-Gaurav
Route: ${req.method} ${req.originalUrl}
`);
    next();
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({
            message: "Courses retrieved successfully",
            result: true,
            data: courses
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            result: false,
            data: null
        });
    }
});

// Get course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                result: false,
                data: null
            });
        }
        res.json({
            message: "Course retrieved successfully",
            result: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            result: false,
            data: null
        });
    }
});

// Create new course
router.post('/', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({
            message: "Course created successfully",
            result: true,
            data: course
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            result: false,
            data: null
        });
    }
});

// Update course
router.put('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                result: false,
                data: null
            });
        }
        res.json({
            message: "Course updated successfully",
            result: true,
            data: course
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            result: false,
            data: null
        });
    }
});

// Delete course
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                result: false,
                data: null
            });
        }
        res.json({
            message: "Course deleted successfully",
            result: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            result: false,
            data: null
        });
    }
});

// Get course videos
router.get('/:id/videos', async (req, res) => {
    try {
        const courseVideos = await CourseVideo.find({ courseId: req.params.id })
            .populate('videoId');
        res.json({
            message: "Course videos retrieved successfully",
            result: true,
            data: courseVideos
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            result: false,
            data: null
        });
    }
});

// Add video to course
router.post('/:id/videos', async (req, res) => {
    try {
        const courseVideo = new CourseVideo({
            courseId: req.params.id,
            videoId: req.body.videoId
        });
        await courseVideo.save();
        res.status(201).json({
            message: "Video added to course successfully",
            result: true,
            data: courseVideo
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            result: false,
            data: null
        });
    }
});

module.exports = router;