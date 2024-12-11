document.addEventListener("DOMContentLoaded", () => {
  // Example: Add a custom handler for song requests
  const form = document.querySelector('.cc_request_form');
  const resultDiv = document.querySelector('[data-type="result"]');

  form.addEventListener('submit', (event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Update the result div with a confirmation message
    resultDiv.innerText = "Request sent!"; // Example confirmation message
  });
});
