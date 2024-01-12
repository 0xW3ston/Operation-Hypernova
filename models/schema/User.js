const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  // passwordHash: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true
  },
  verifiedAt: {
    type: Date
  },
  verify_token: {
    type: String
  }, 
  modifiedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default:new Date()
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}