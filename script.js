const emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const toEmail = document.getElementById('toEmail').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send the form data as JSON
    try {
        const response = await fetch('https://customsendmail.vercel.app/api/sendMail', { // Replace with your backend URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toEmail, subject, message }),
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        const data = await response.json();
        alert(data.message || 'Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Error sending email: ' + error.message);
    }
});
