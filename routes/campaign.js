// routes/campaign.js
const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign"); 

// POST route to create a new campaign
router.post("/", async (req, res) => {
  try {
    const { title, message, audienceSegmentId } = req.body;

    const newCampaign = new Campaign({
      title,
      message,
      audienceSegment: audienceSegmentId
    });

    await newCampaign.save();
    res.status(201).send("Campaign created successfully");
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).send("Error creating campaign");
  }
});

module.exports = router;
