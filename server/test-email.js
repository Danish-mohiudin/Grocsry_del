import nodemailer from 'nodemailer';
import "dotenv/config";

console.log('Testing with:');
console.log('Email:', process.env.EMAIL_USER);
console.log('Password:', process.env.EMAIL_PASS ? '****' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'Test Email from GreenCart',
  text: 'If you receive this, your email setup is working! ✅',
  html: '<h2>If you receive this, your email setup is working! ✅</h2>'
};

console.log('Sending test email...');

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('❌ Error:', error);
  } else {
    console.log('✅ Email sent successfully!');
    console.log('Response:', info.response);
  }
});