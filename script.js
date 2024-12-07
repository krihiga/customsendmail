document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const fileInput = document.getElementById('file');
    const files = fileInput.files;

    // Create FormData to handle file attachments
    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    // Append each file to FormData
    for (let i = 0; i < files.length; i++) {
        formData.append('attachments', files[i]);
    }

    // Send the form data to your backend
    fetch('https://customsendmail.vercel.app/api/sendmail', { // Replace with your deployed Vercel URL
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()) // Parse JSON response
    .then(data => {
        if (data.success) {
            alert(data.message || 'Email sent successfully!');
        } else {
            throw new Error(data.error || 'Failed to send email');
        }
    })
    .catch(error => {
        console.error('Error sending email:', error);
        alert('Error sending email: ' + error.message);
    });
});
