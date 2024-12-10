const emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const toEmail = document.getElementById('toEmail').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create FormData to handle file attachments
    const formData = new FormData();
    formData.append('email', toEmail);
    formData.append('subject', subject);
    formData.append('message', message);


   // Send the form data to your backend
fetch('https://customsendmail.vercel.app/api/sendmail', { // Replace with your deployed Vercel URL
method: 'POST',
body: formData,
})
.then(response => {
if (!response.ok) {
    throw new Error('Failed to send email');
}
return response.json();
})
.then(data => {
alert(data.message || 'Email sent successfully!');
})
.catch(error => {
console.error('Error sending email:', error);
alert('Error sending email: ' + error.message);
});
})    