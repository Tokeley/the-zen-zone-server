const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password
  },
});

router.post('/', (req, res) => {
  const { name, email, feedbackType, feedback } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL, // recipient email
    subject: `New Feedback: ${feedbackType}`,
    text: `
      Name: ${name}
      Email: ${email}
      Feedback Type: ${feedbackType}
      Feedback: ${feedback}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending feedback' + error);
    }
    res.status(200).send('Feedback sent!');
  });
});

module.exports = router;
