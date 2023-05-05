const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  AUTH_ID: {
    type: String,
    required: true,
    unique: true
  },
  AUTH_PASS: {
    type: String,
    required: true
  }
});

const deviceModel = mongoose.model('devices', deviceSchema);

module.exports = deviceModel;
