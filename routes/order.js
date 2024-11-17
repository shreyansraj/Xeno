const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/order");

// Route to create an order
router.post("/", createOrder);

// Route to get all orders
router.get("/", getAllOrders);

module.exports = router;
