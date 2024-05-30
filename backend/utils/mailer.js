const nodemailer = require('nodemailer');
require('dotenv').config();
// Replace with your actual Gmail email and the app password you generated


const EMAIL = process.env.EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: APP_PASSWORD,
  },
});

const sendResetEmail = (email, token) => {
  const resetLink = `http://localhost:3000/reset-password/${token}`;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendResetEmail };
