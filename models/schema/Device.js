const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceSchema = new Schema({
    model: {
      type: String,
      required: true
    },
    // last_ip_connected: { },
    modifiedAt: {
      type: Date
    },
    createdAt: {
      type: Date,
      default:new Date()
    }
  });

const Device = mongoose.model('Device', DeviceSchema);

module.exports = {
    Device
}