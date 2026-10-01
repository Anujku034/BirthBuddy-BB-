require("dotenv").config();
const nodemailer = require("nodemailer");
console.log("EMAIL USER IN SERVICE:", process.env.EMAIL_USER);
console.log("EMAIL PASS IN SERVICE:", !!process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendResetPasswordOtp = async (email,otp) =>{
    await transporter.sendMail({
        from: `"BirthBuddy" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "BirthBuddy Password Reset OTP",
        html: `<div style="font-family: Arial, sans-serif;">
                  <h2> Reset Your BirthBuddy Password </h2>
                  <p>Your password reset OTP is: </P>
                  <h1 style="letter-spacing: 5px;">
                    ${otp}
                  </h1>
                  <p> This OTP will expire in 10 minutes. </p>
                  <p>
                    If you did not request a password reset,
                    you can safely ignore this email.
                  </p>
                </div>
        `,
    });
};
module.exports = sendResetPasswordOtp;