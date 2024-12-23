const Course = require('../models/course.model');
const User = require('../models/user.model');
const CourseVideo = require('../models/courseVideo.model');
const Enrollment = require('../models/enrollment.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class OnlineLearningController {
    // Get All Courses
    async getAllCourse(req, res) {
        try {
            const courses = await Course.find();
            return res.status(200).json({
                message: "Courses retrieved successfully",
                result: true,
                data: courses
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                result: false,
                data: null
            });
        }
    }

    // Get Course Videos by CourseId
    async getCourseVideosbyCourseId(req, res) {
        try {
            const courseId = req.query.courseId;
            const courseVideos = await CourseVideo.find({ courseId })
                .populate('videoId')
                .populate('courseId');

            return res.status(200).json({
                message: "Course videos retrieved successfully",
                result: true,
                data: courseVideos
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                result: false,
                data: null
            });
        }
    }

    // Add New User
    async addNewUser(req, res) {
        try {
            const user = new User(req.body);
            await user.save();

            return res.status(201).json({
                message: "User created successfully",
                result: true,
                data: {
                    userId: user._id,
                    userName: user.userName,
                    emailId: user.emailId
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                result: false,
                data: null
            });
        }
    }

    // Login
    async login(req, res) {
        try {
            const { userName, password } = req.body;
            const user = await User.findOne({ userName });

            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({
                    message: "Invalid credentials",
                    result: false,
                    data: null
                });
            }

            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                message: "Login successful",
                result: true,
                data: {
                    token,
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
            return res.status(500).json({
                message: error.message,
                result: false,
                data: null
            });
        }
    }

    // Create New Enrollment
    async createNewEnrollment(req, res) {
        try {
            const enrollment = new Enrollment(req.body);
            await enrollment.save();

            return res.status(201).json({
                message: "Enrollment created successfully",
                result: true,
                data: enrollment
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                result: false,
                data: null
            });
        }
    }

    // Get Enrolled Course By UserId
    async getEnrolledCourseByUserId(req, res) {
        try {
            const userId = req.query.userid;
            const enrollments = await Enrollment.find({ userId })
                .populate('courseId');

            return res.status(200).json({
                message: "Enrolled courses retrieved successfully",
                result: true,
                data: enrollments
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                result: false,
                data: null
            });
        }
    }
}

module.exports = new OnlineLearningController();