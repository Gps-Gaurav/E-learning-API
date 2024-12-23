const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  totalHours: { type: Number, required: true },
  totalVideos: { type: Number, required: true },
  courseDescription: String,
  thumbnailUrl: String
});

module.exports = mongoose.model('Course', courseSchema);