function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // After a delay, remove the notification
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 1);
}

document.addEventListener("DOMContentLoaded", function() {
    const hasSignedUp = localStorage.getItem("newsletterSignedUp");

    if (!hasSignedUp) {
        showNewsletterSignupForm();
    }
});

document.getElementById("newsletterForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Let user know they have signed up
    localStorage.setItem("newsletterSignedUp", true);
    
    hideNewsletterSignupForm();
    showNotification("You are now signed up for our newsletter!");
    alert("You are now signed up for our newsletter!"); // Display a pop-up message
});

document.getElementById("closeNewsletter").addEventListener("click", function(event) {
    event.preventDefault(); 
    hideNewsletterSignupForm();
});

function showNewsletterSignupForm() {
    const newsletterForm = document.getElementById("newsletterFormContainer");
    newsletterForm.style.display = "block";
}

function hideNewsletterSignupForm() {
    const newsletterForm = document.getElementById("newsletterFormContainer");
    newsletterForm.style.display = "none";
}
