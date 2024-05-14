document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("banner");
    const closePopupButton = document.getElementById("close");
  
    // Check if the user has visited before (using cookies)
    const hasVisitedBefore = !!localStorage.getItem("visitedBefore");
  
    if (!hasVisitedBefore) {
        // Show the popup
        popup.style.display = "block";
        localStorage.setItem("visitedBefore", "true");
    }
  
    // Close the popup when the user clicks the close button
    closePopupButton.addEventListener("click", function() {
        popup.style.display = "none";
    });
  });