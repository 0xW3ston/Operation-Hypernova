const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceAccessKeySchema = new Schema({
  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required:true
  },
  device_id: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required:true
  },
  key: {
    type: String,
    required: true,
  },
//   timestamp_last_used {},
  createdAt: {
    type: Date,
    default:new Date()
  }
});

const DeviceAccessKey = mongoose.model('DeviceAccessKey', DeviceAccessKeySchema); 

module.exports = {
    DeviceAccessKey
}