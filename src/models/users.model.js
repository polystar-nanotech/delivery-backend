const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    FullNames: { type: String, required: true },
    Email: { type: String, required: true},
    Password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("users", userSchema);
