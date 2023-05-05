const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  AUTH_ID: {
    type:String,
    required: true
  },
  Temp:{
    type: Number,
    required: false,
    default: 0
  },
  Hum:{
    type: Number,
    required: false,
    default: 0
  },
  Time:{
    type: Date,
    required: false,
    default: new Date()
  }
});

const dataModel = mongoose.model('datas', dataSchema);

module.exports = dataModel;
