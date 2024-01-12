const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
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
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
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

SubscriptionSchema.methods.isActive = function() {
  const currentDate = new Date();
  if ((new Date(this.dateEnd)) > currentDate) {
    return true;
  } else {
    return false;
  }
}

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = {
    Subscription
}