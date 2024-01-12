const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required:true
  },
  severity: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer.'
    }
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  modifiedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default:new Date()
  }
});

const Notification = mongoose.model('Notification', NotificationSchema); 

module.exports = {
    Notification
}