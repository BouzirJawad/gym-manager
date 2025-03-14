const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
