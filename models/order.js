const mongoose = require("mongoose");
const Customer = require("./customer");

const orderSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Customer", 
    required: true 
    },

  orderAmount: { 
    type: Number, 
    required: true 
    },

  orderDate: { type: Date, 
    default: Date.now 
    },

  items: [{
    itemName: String, 
    quantity: Number, 
    price: Number 
    }]
});

// Middleware to update customer data after an order is saved
orderSchema.post("save", async function(doc) {
  try {
    const customer = await Customer.findById(doc.customerId);

    if (!customer) {
      console.error("Customer not found!");
      return;
    }

    // Update the customer's total spending
    customer.totalSpending += doc.orderAmount;

    // Update the number of visits (since each order represents a visit)
    customer.visits += 1;

    // Update the last visit time to the current date
    customer.lastVisit = new Date();

    // Save the updated customer
    await customer.save();
  } catch (error) {
    console.error("Error updating customer after order:", error);
  }
});

module.exports = mongoose.model("Order", orderSchema);
