const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  
    port: 587,               
    secure: false,           
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

module.exports = async (req, res) => {
    console.log('Request method:', req.method);
    console.log('Request headers:', req.headers);

    if (req.method === 'POST') {
        try {
            console.log('Request body:', req.body);

            const { toEmail, subject, message } = req.body;

            if (!toEmail || !subject || !message) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: toEmail,
                subject,
                text: message,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
