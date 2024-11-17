// routes/customer.js

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

// POST request to add customers (single or multiple)
router.post("/", customerController.createCustomers);

// GET request to retrieve all customers
router.get("/", customerController.getAllCustomers);

module.exports = router;
