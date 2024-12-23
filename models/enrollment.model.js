const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrolledDate: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);