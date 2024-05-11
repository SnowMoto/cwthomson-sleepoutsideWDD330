// searchBox.js

import ProductData from "../js/ProductData.mjs"; // Adjust the import path accordingly

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the search query from the input field
    const searchQuery = document.getElementById("searchInput").value.trim();
    
    // Call the fetchSearchResults function with the search query
    fetchSearchResults(searchQuery);
});

function fetchSearchResults(query) {
    new ProductData("tents")
        .searchProducts(query)
        .then(searchResults => {
            if (searchResults.length > 0) {
                displaySearchResults(searchResults);
            } else {
                displayNoResultsMessage();
            }
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
        });
}

function displaySearchResults(results) {
    console.log("Displaying search results:", results);
}

function displayNoResultsMessage() {
    console.log("No search results found.");
}
