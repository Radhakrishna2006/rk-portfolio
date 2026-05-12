// Connect to Backend
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const status = document.getElementById('status');

    status.textContent = "Sending message...";
    status.style.color = "blue";

    try {
        const response = await fetch('http://localhost:5000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();
        
        if (data.success) {
            status.style.color = "green";
            status.textContent = "✅ Message sent successfully! Thank you.";
            this.reset(); // Clear the form
        }
    } catch (error) {
        status.style.color = "red";
        status.textContent = "❌ Cannot connect to server. Make sure backend is running.";
        console.error(error);
    }
});
