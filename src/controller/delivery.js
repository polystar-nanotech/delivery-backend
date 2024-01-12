import { Delivery } from "../models";

export const deliveryData = async (req, res) => {
  try {
    const formData = req.body;
    const imagePath = req.file ? req.file.path : null;
    if (imagePath == null) {
        console.log("no image");
        return res.status(401).json({
            message: "please provide image"
        })
    }
    // Save form data to MongoDB
    const delivery = new Delivery({
      ...formData,
      image: imagePath,
    });
    const saveDelivery = await delivery.save();
    if (!saveDelivery) {
      return res.status(401).json({
        message: "Failed to save delivery",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Form data received and saved successfully",
      saveDelivery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
