const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required:true},
    device: { type: Schema.Types.ObjectId, ref: 'Device', required:true },
    dateStart: Date,
    dateEnd: Date,
    createdAt: {
      type: Date,
      default:new Date()
    }
  });

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = {
    Subscription
}