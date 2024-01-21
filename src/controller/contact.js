import { contactModel } from "../models";
import { transporter } from "../utils";

export const contact = async (req, res) => {
  try {
    // Save form data to MongoDB
    const message = new contactModel(req.body);
    const savedMessage = await message.save();
    if (!savedMessage) {
      return res.status(401).json({
        message: "Failed to save contact",
      });
    }
    // Send email
    const mailOptions = {
      from: "polystarnanotech@gmail.com",
      to: "polystarnanotech@gmail.com",
      subject: savedMessage.subject,
      html: `
          <p>Name: ${savedMessage.name}</p>
          <p>Email From: ${savedMessage.email}</p>
          <p>Message: ${savedMessage.message}</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent:", info.messageId);
      }
    });

    res.status(201).json({
      success: true,
      message: "Thank you for contacting us we'll reply ASAP!!",
      savedMessage,
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
