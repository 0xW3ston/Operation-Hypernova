const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
    timestamp: Date,
    device: { type: Schema.Types.ObjectId, ref: 'Device' },
    temperature: Number,
    humidity: Number,
  });

const Data = mongoose.model('Data', DataSchema);

module.exports = {
    Data
}
