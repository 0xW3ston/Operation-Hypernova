const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
  username: {
    type: String,
    unique: true 
  },
  name: {
    type: String
  },
  modifiedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default:new Date()
  }
});

const Group = mongoose.model('Group', GroupSchema); 

module.exports = {
    Group
}