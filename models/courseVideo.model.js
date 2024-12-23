const mongoose = require('mongoose');

const courseVideoSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }
});

module.exports = mongoose.model('CourseVideo', courseVideoSchema);