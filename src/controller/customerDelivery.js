
import { DeliveryOrderModel } from "../models";
import { transporter } from "../utils";
export const delivery = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const delivery = new DeliveryOrderModel(formData);
    const saveDelivery = await delivery.save();
    if (!saveDelivery) {
      return res.status(401).json({
        message: "Failed to save delivery",
      });
    }
    const mailOptions = {
      from: "polystarnanotech@gmail.com",
      to: "polystarnanotech@gmail.com",
      subject: "New Delivery Request",
      html: `
      <p>Customer Name: ${saveDelivery.customerName}</p>
      <p>Customer Contact: ${saveDelivery.contactNumber}</p>
      <p>Delivery Address ${saveDelivery.deliveryAddress}</p>
      <p>Items: ${saveDelivery.items}</p>
      <p>pickup Location: ${saveDelivery.pickupLocation}</p>
      <p>pickup Contact: ${saveDelivery.pickupContact}</p>
      <p>delivery Date: ${saveDelivery.deliveryDate}</p>
      `,
    };
    console.log(mailOptions);
  await transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        return res.json({ success: false });
      }
      console.log("Agency Email sent: " + info);
      const mailOption = {
        from: "polystarnanotech@gmail.com",
        to: saveDelivery.customerEmail,
        subject: "Moving meastros",
        html: `
        <p>Murakoze guhitamo  gukoresha  moving meastros .</p>
        <p>On time every time !!</p>
        <p>Phone call :: </p>
        <p>Email: </p>
        <p>Momo pay:776655</p>
        <p>Thank you!!</p>
        `,
      };
      await transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.error(error);
          return res.json({ success: false });
        }
        console.log("Email sent: " + info);
        return res.status(201).json({
          message: "Delivery request sent successfully",
          success: true,
          data: saveDelivery,
        });
      });
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
