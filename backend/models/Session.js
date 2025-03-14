const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
  },
  coach: {
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
    min: 0, 
  },
});

module.exports = mongoose.model('Session', sessionSchema);
