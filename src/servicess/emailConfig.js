import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST||"smtp.gmail.com",
  port: process.env.GMAIL_PORT||587,
  secure: false, 
  auth: {
    user: process.env.MY_EMAIL||"anvishwakarma@bestpeers.com",
    pass: process.env.GOOGLE_APP_PASSWORD|| "muun blty ttgw kzxl",
  },
});
