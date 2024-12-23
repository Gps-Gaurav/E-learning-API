const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  emailId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  createdDate: { type: Date, default: Date.now },
  password: { type: String, required: true },
  projectName: String,
  refreshToken: String,
  refreshTokenExpiryTime: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);