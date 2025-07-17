import { transporter } from "./emailConfig.js";

export const sendOtp = async (email, otp) => {
  try {
    const response = await transporter.sendMail({
      from: '"My-Comm" <anvishwakarma@bestpeers.com>',
      to: email,
      subject: "Verify Your Email - My-Comm",
      text: `Your verification code is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Verify Your Email</h2>
          <p>Hello,</p>
          <p>Thank you for registering with <strong>My-Comm</strong>.</p>
          <p>Your verification code is:</p>
          <h1 style="background: #f2f2f2; display: inline-block; padding: 10px 20px; border-radius: 5px; color: #111;">${otp}</h1>
          <p>This code will expire in 10 minutes. Please do not share it with anyone.</p>
          <p>If you did not request this, please ignore this email.</p>
          <br/>
          <p>Thanks,<br/>The My-Comm Team</p>
        </div>
      `,
    });
    // console.log(response,'resposnse is here ..')
  } catch (error) {
    console.log("Error while sending OTP:", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"My-Comm" <anvishwakarma@bestpeers.com>',
      to: email,
      subject: "Welcome to My-Comm!",
      text: `Hi ${name},\n\nWelcome to My-Comm! Your email has been successfully verified. We're excited to have you onboard.\n\nThanks,\nThe My-Comm Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Welcome to My-Comm, ${name}!</h2>
          <p>Hello ${name},</p>
          <p>🎉 Congratulations! Your email has been successfully verified and your My-Comm account is now active.</p>
          <p>We're thrilled to have you join our community. You can now log in, explore, and start using all our features.</p>
          <p>If you have any questions, feel free to reply to this email — we're always here to help.</p>
          <br/>
          <p>Thanks for choosing us!<br/>The My-Comm Team</p>
        </div>
      `,
    });
    // console.log("Welcome email sent:", response.messageId);
  } catch (error) {
    console.log("Error while sending welcome email:", error);
  }
};
