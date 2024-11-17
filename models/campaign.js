// models/campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  audienceSegmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AudienceSegment'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
