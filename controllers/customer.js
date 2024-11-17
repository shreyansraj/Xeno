// controllers/customer.js

const Customer = require("../models/customer"); 

// Controller to create customers
const createCustomers = async (req, res) => {
    try {
        const newCustomers = await Customer.create(req.body);
        res.status(201).json({ message: "Customer(s) added successfully", customers: newCustomers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller to get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCustomers, getAllCustomers };
