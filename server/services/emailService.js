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
const sendBirthdayReminderEmail = async (
    email,
    userName,
    birthdays
) => {
    const birthdayList = birthdays
        .map(
            (person) => `
                <li style="margin-bottom: 12px;">
                    🎂 <strong>${person.fullName}</strong>
                    — 📱 ${person.phone || "No WhatsApp number"}
                </li>
            `
        )
        .join("");

    await transporter.sendMail({
        from: `"BirthBuddy" <${process.env.EMAIL_USER}>`,
        to: email,
        subject:
            birthdays.length === 1
                ? `🎂 ${birthdays[0].fullName}'s Birthday Today!`
                : `🎂 ${birthdays.length} Birthdays Today!`,
        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 20px;
            ">
                <h2>Hey ${userName} 👋</h2>

                <p>
                    Today is the birthday of:
                </p>

                <ul style="padding-left: 20px;">
                    ${birthdayList}
                </ul>

                <p style="margin-top: 25px;">
                    Don't forget to wish them! 🎉
                </p>

                <p style="margin-top: 30px;">
                    — Team BirthBuddy
                </p>
            </div>
        `,
    });
};



module.exports = {sendResetPasswordOtp,sendBirthdayReminderEmail,};