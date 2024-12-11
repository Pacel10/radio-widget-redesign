document.addEventListener("DOMContentLoaded", () => {
  // Song Request Form Handler
  const form = document.querySelector(".cc_request_form");
  const resultDiv = document.querySelector('[data-type="result"]');

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    resultDiv.innerText = "Request sent!"; // Example confirmation message
  });

  // Search Functionality for On-Demand Content
  const searchInput = document.getElementById("searchInput");
  const songs = document.querySelectorAll("#songList div");

  searchInput.addEventListener("input", function () {
    const filter = this.value.toLowerCase(); // Convert input to lowercase

    songs.forEach((song) => {
      const songTitle = song.textContent.toLowerCase(); // Get song title
      if (songTitle.includes(filter)) {
        song.style.display = "flex"; // Show song if it matches filter
      } else {
        song.style.display = "none"; // Hide song otherwise
      }
    });
  });
});

