document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation using a simple regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            showNotification('Your message has been sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Custom notification function for contact page
    function showNotification(message, type = 'success') {
        // Check if a notification container already exists
        let notificationContainer = document.getElementById('contact-notification');
        
        // If not, create one
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'contact-notification';
            notificationContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                padding: 15px 25px;
                border-radius: 4px;
                font-weight: 500;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            `;
            
            // Set background color based on type
            if (type === 'success') {
                notificationContainer.style.backgroundColor = '#2ecc71';
                notificationContainer.style.color = 'white';
            } else {
                notificationContainer.style.backgroundColor = '#e74c3c';
                notificationContainer.style.color = 'white';
            }
            
            notificationContainer.textContent = message;
            document.body.appendChild(notificationContainer);
            
            // Remove after 3 seconds
            setTimeout(() => {
                document.body.removeChild(notificationContainer);
            }, 3000);
        }
    }
});
