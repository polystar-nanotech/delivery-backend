const mongoose = require('mongoose');

// Define a schema for the form data
const deliveryOrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  customerEmail: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  items: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  pickupContact: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
},
{
  timestamps: true,
});

// Create a Mongoose model based on the schema
export const DeliveryOrderModel = mongoose.model('DeliveryOrder', deliveryOrderSchema);
