const Order = require("../models/order");
const Customer = require("../models/customer");

// Controller to create an order for a customer
const createOrder = async (req, res) => {
    try {
        const { customerId, orderAmount, items } = req.body;

        // Check if the customer exists
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Create a new order
        const newOrder = await Order.create({ customerId, orderAmount, items });

        res.status(201).json({ message: "Order added successfully", order: newOrder });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller to get all orders
const getAllOrders = async (req, res) => {
    try {
        // Fetch all orders with customer details populated
        const orders = await Order.find().populate("customerId", "name email phone");
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createOrder, getAllOrders };
