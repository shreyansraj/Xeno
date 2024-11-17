// controllers/campaign.js
const AudienceSegment = require('../models/audienceSegment');

exports.renderCampaignForm = async (req, res) => {
  try {
    const segments = await AudienceSegment.find();
    res.render('campaign', { segments });
  } catch (error) {
    res.status(500).send('Error loading campaign form');
  }
};
