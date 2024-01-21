const mongoose = require("mongoose");

// Define a schema for the form data
const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model based on the schema
export const contactModel = mongoose.model("contact", contactSchema);
