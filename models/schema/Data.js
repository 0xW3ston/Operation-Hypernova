const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
  device_id: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  timestamp: {
    type: Date,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
});

const Data = mongoose.model('Data', DataSchema);

module.exports = {
    Data
}
