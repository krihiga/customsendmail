const nodemailer = require('nodemailer');

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

// API route for sending the email
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // Log the incoming form data to check
            console.log('Form Data:', req.body);

            const { toEmail, subject, message } = req.body;

            if (!toEmail || !subject || !message) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const mailOptions = {
                from: process.env.GMAIL_USER,  // Sender's email address
                to: toEmail,                  // Recipient's email address
                subject: subject,             // Subject of the email
                text: message,                // Body of the email
            };

            // Send the email
            const info = await transporter.sendmail(mailOptions);
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
