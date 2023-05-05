const mongoose = require('mongoose');

const personneSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


const personneModel = mongoose.model('personnes', personneSchema);

module.exports = personneModel;