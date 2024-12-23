const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  videoTitle: { type: String, required: true },
  videoDescription: String,
  videoThumbnail: String,
  totalDuration: String
});

module.exports = mongoose.model('Video', videoSchema);