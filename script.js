document.getElementById('logoOrderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const businessName = document.getElementById('businessName').value;
    const colors = document.getElementById('colors').value;
    const description = document.getElementById('description').value;
    const fileInput = document.getElementById('file');
    const files = fileInput.files;

    // Create FormData to handle file attachments
    const formData = new FormData();
    formData.append('email', email);
    formData.append('businessName', businessName);
    formData.append('colors', colors);
    formData.append('description', description);

    // Append each file to FormData
    for (let i = 0; i < files.length; i++) {
        formData.append('attachments', files[i]);
    }

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
});
