const emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const toEmail = document.getElementById('toEmail').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    console.log('Form data:', { toEmail, subject, message });

    try {
        console.log('Sending fetch request...');
        const response = await fetch('https://customsendmail.vercel.app/api/sendMail', { // Replace with your backend URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toEmail, subject, message }),
        });
    
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
    
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
            throw new Error('Failed to send email');
        }
    
        const data = await response.json();
        console.log('Success response:', data);
        alert(data.message || 'Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Error sending email: ' + error.message);
    }
})    