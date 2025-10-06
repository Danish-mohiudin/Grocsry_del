import transporter from '../configs/nodemailer.js';

// Send contact form email
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Email to admin
    const mailOptionsToAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email to receive messages
      subject: `🔔 New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #10b981; border-bottom: 3px solid #10b981; padding-bottom: 10px; margin-bottom: 20px;">
              📧 New Contact Form Submission
            </h2>
            <div style="margin: 20px 0; line-height: 1.8;">
              <p style="margin: 10px 0;"><strong style="color: #333;">👤 Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #333;">📧 Email:</strong> <a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #333;">📱 Phone:</strong> ${phone || 'Not provided'}</p>
              <p style="margin: 10px 0;"><strong style="color: #333;">📋 Subject:</strong> ${subject}</p>
            </div>
            <div style="background-color: #f0fdf4; padding: 20px; border-left: 4px solid #10b981; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #333;">💬 Message:</strong></p>
              <p style="margin: 0; color: #555; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; color: #999;">
              <p style="margin: 0; font-size: 12px;">This email was sent from GreenCart Contact Form</p>
            </div>
          </div>
        </div>
      `
    };

    // Confirmation email to user
    const mailOptionsToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '✅ Thank you for contacting GreenCart',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #10b981; margin: 0;">🌱 GreenCart</h1>
            </div>
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for reaching out! 🙏</h2>
            <p style="color: #555; line-height: 1.8;">Hi <strong>${name}</strong>,</p>
            <p style="color: #555; line-height: 1.8;">
              We've received your message and truly appreciate you taking the time to contact us. 
              Our team will review your inquiry and get back to you within <strong>24 hours</strong>.
            </p>
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="margin: 0 0 10px 0; color: #333;"><strong>📝 Your Message:</strong></p>
              <p style="margin: 0; color: #555; font-style: italic; white-space: pre-wrap;">"${message}"</p>
            </div>
            <div style="background-color: #10b981; padding: 20px; border-radius: 8px; margin: 25px 0; color: white;">
              <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>⚡ Need immediate assistance?</strong></p>
              <p style="margin: 5px 0;">📞 Call us: +1 (555) 123-4567</p>
              <p style="margin: 5px 0;">📧 Email: support@greencart.com</p>
              <p style="margin: 5px 0;">⏰ Mon-Fri: 8AM - 8PM</p>
            </div>
            <p style="color: #555; line-height: 1.8;">
              Best regards,<br>
              <strong style="color: #10b981;">The GreenCart Team</strong> 🌿
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; color: #999;">
              <p style="margin: 0; font-size: 12px;">This is an automated confirmation email from GreenCart</p>
            </div>
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);

    console.log(`✅ Email sent successfully from: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! Check your inbox for confirmation.'
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later or contact us directly.'
    });
  }
};