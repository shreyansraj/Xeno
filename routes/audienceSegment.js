// routes/audienceSegment.js
const express = require("express");
const router = express.Router();
const AudienceSegment = require("../models/audienceSegment"); // Ensure this model exists

// POST route to create a new audience segment
router.post("/", async (req, res) => {
  try {
    const { name, totalSpending, visits, lastVisit } = req.body;

    const newSegment = new AudienceSegment({
      name,
      conditions: {
        totalSpending,
        visits,
        lastVisit
      }
    });

    await newSegment.save();
    res.status(201).send("Audience Segment created successfully");
  } catch (error) {
    console.error("Error creating audience segment:", error);
    res.status(500).send("Error creating audience segment");
  }
});

module.exports = router;
