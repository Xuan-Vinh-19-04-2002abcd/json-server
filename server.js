const express = require('express');
const jsonServer = require('json-server');
const nodemailer = require('nodemailer');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(jsonServer.bodyParser);
app.use(middlewares);

app.post('/send-email', (req, res) => {
  const { email, quantity } = req.body;

  // Create a transporter with your email server configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'vinh.dang23@student.passerellesnumeriques.org',
      pass: 'vlwkakeaqkdemdet',
    },
  });

  // Create email content
  const mailOptions = {
    from: 'vinh.dang23@student.passerellesnumeriques.org',
    to: email,
    subject: 'Cable Drum Request',
    text: `You have a new Cable Drum Request for ${quantity} cable drums.`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

app.use('/', router); // Mount the JSON Server router under '/api' endpoint

const port = 8000; // Port for the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

