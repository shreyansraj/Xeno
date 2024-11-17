// controllers/audienceSegment.js
const AudienceSegment = require('../models/audienceSegment');
const Customer = require('../models/customer');

exports.createSegment = async (req, res) => {
  const { name, conditions } = req.body;

  // Build query based on conditions
  const query = {};
  if (conditions.totalSpending) query.totalSpending = { $gt: conditions.totalSpending };
  if (conditions.visits) query.visits = { $lte: conditions.visits };
  if (conditions.lastVisit) query.lastVisit = { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) };

  try {
    const matchingCustomers = await Customer.find(query);
    const audienceSize = matchingCustomers.length;

    // Save Audience Segment
    const segment = new AudienceSegment({ name, conditions, audienceSize });
    await segment.save();

    res.json({ segment, audienceSize });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
