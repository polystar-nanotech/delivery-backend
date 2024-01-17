import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "polystarnanotech@gmail.com", //process.env.MAILER_AUTH_USER,
    pass: "mxob uxqs cseb trcu",//process.env.MAILER_AUTH_PASS,
  },
});
