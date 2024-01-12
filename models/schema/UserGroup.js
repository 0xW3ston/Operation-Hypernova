const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserGroupSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required:true
  },
  modifiedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default:new Date()
  }
});
UserGroupSchema.index({ user_id: 1, group_id: 1 }, { unique: true });

const UserGroup = mongoose.model('UserGroup', UserGroupSchema); 

module.exports = {
    UserGroup
}