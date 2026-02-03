const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Community', 'Admin'],
    default: 'Community'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  points: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', UserSchema);