const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required:true},
  device: { type: Schema.Types.ObjectId, ref: 'Device', required:true },
  dateStart: Date,
  dateEnd: Date,
  createdAt: {
    type: Date,
    default:new Date()
  },
  token:{
    type:String,
    default:uuidv4,
    unique:true
  }
});

SubscriptionSchema.methods.isActive = function() {
  const currentDate = new Date();
  if (this.dateEnd > currentDate) {
    return true;
  } else {
    return false;
  }
}

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = {
    Subscription
}