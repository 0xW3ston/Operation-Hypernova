const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  email: String,
  role: { type: String, enum: ['admin', 'user'] },
  createdAt: {
    type: Date,
    default:new Date()
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}