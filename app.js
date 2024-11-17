const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts"); // Add this line

const customerRoutes = require("./routes/customer");
const orderRoutes = require("./routes/order");
const audienceSegmentRoutes = require("./routes/audienceSegment");
const campaignRoutes = require("./routes/campaign");

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/CRM";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Set up EJS and express-ejs-layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts); // Use express-ejs-layouts
app.set("layout", "layouts/layout"); // Specify default layout

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/audience-segments", audienceSegmentRoutes);
app.use("/api/campaigns", campaignRoutes);

// Routes for audience and campaign forms
app.get("/audience-segments", (req, res) => {
  res.render("audienceSegment");
});

app.get("/campaigns", async (req, res) => {
  try {
    const segments = await mongoose.model('AudienceSegment').find();
    res.render("campaign", { segments });
  } catch (error) {
    res.status(500).send("Error loading campaign form");
  }
});

app.get("/", (req, res) => {
  res.send("Hi, Complete this Assignment");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
