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
    fetch('https://customsendmail.vercel.app/api/sendMail', { // Replace with your deployed Vercel URL
        method: 'POST',
        body: formData,
    })
        .then(response => {
            // Check if the response status is okay
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'Failed to send email');
                });
            }
            return response.json();
        })
        .then(data => {
            // Handle success response
            if (data.success) {
                alert(data.message || 'Email sent successfully!');
            } else {
                // Handle custom error messages from backend
                throw new Error(data.error || 'An unexpected error occurred');
            }
        })
        .catch(error => {
            // Catch and alert errors
            console.error('Error:', error);
            alert(`Error sending email: ${error.message}`);
        });
});
