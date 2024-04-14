const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS

// Route to send email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  const recipients = Array.isArray(to) ? to : [to];

  try {
    // Create transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "khandelwalprinci1@gmail.com", // Your Gmail email address
        pass: "fibfrxkcdmliflxx" // Your Gmail password
      }
    });

    const emailPromises = recipients.map(email => {
      const mailOptions = {
        from: "khandelwalprinci1@gmail.com", // Sender email address
        to: email, // Recipient email address
        subject: subject,
        text: text
      };
      return transporter.sendMail(mailOptions);
    });

    // Send emails asynchronously
    await Promise.all(emailPromises);

    console.log('Emails sent successfully');
    res.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: 'Error sending emails' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
