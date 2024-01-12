const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    transporter_name: String,
    transporter_contact: String,
    product_description: String,
    customer_name: String,
    customer_contact: String,
    delivery_address: String,
    customer_email: String,
    delivery_date: Date,
    image: String, // Assuming you store the file path
  });
  
 export const Delivery = mongoose.model('Delivery', deliverySchema);
  