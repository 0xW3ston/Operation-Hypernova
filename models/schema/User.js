const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const UserSchema = new Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  email: String,
  role: { type: String, enum: ['admin', 'user'] },
  createdAt: {
    type: Date,
    default:new Date()
  },
  token:{
    type:String,
    default: uuidv4,
    unique:true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}