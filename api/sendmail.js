const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Set up storage for multer (in-memory storage for file upload)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('attachments');

// Create a transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Gmail's SMTP server
    port: 587,               // TLS port
    secure: false,           // Use TLS
    auth: {
        user: process.env.GMAIL_USER,  // Your Gmail address
        pass: process.env.GMAIL_PASS,  // Your Gmail App password or regular password
    },
});

// Middleware to parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route for sending the email
app.post('/api/sendmail', (req, res) => {
    // Parse the incoming form data with file attachments
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(400).json({ error: 'Error uploading file' });
        }

        const { email, businessName, colors, description } = req.body;

        // Construct the email content
        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender's email address
            to: email,                   // Recipient's email address
            subject: `Logo Design Request: ${businessName}`, // Subject of the email
            text: `
                Business Name: ${businessName}
                Preferred Colors: ${colors}
                Description: ${description}
            `, // Plain text body
            attachments: [], // Attachments will be added here
        };

        // Add file attachments
        if (req.files) {
            req.files.forEach(file => {
                mailOptions.attachments.push({
                    filename: file.originalname,
                    content: file.buffer,
                });
            });
        }

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    });
});

// Default route for unsupported methods
app.use((_req, res) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});
