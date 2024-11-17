// models/audienceSegment.js
const mongoose = require('mongoose');

const audienceSegmentSchema = new mongoose.Schema({
  name: String,
  conditions: Object,
  audienceSize: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AudienceSegment', audienceSegmentSchema);
