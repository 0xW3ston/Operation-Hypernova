const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceSchema = new Schema({
    AUTH_ID: { type: String, unique: true },
    AUTH_PASS: String,
    name: {
      type: String,
      required:false
    }
  });

const Device = mongoose.model('Device', DeviceSchema);

module.exports = {
    Device
}