document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const songListDiv = document.getElementById("songList");
  const playButton = document.getElementById("playSelected");

  // Simulate fetching real songs from your backend/playlist
  const fetchSongs = async () => {
    // Replace this with your actual API or backend call to fetch songs
    return [
      "Petvoj Nervy",
      "Never Let Me Down",
      "Lost Frequencies",
      "Nervy Remix",
      "Some Other Song",
    ];
  };

  let songs = []; // Real song data
  let selectedSong = null; // Track selected song

  // Fetch and populate songs initially
  const initSongs = async () => {
    songs = await fetchSongs();
    renderSongs(); // Render all songs initially
  };

  // Render songs matching the search query
  const renderSongs = (query = "") => {
    songListDiv.innerHTML = ""; // Clear previous results
    const filteredSongs = songs.filter((song) =>
      song.toLowerCase().includes(query.toLowerCase())
    );

    filteredSongs.forEach((song) => {
      const songDiv = document.createElement("div");
      songDiv.textContent = song;

      // Handle song selection
      songDiv.addEventListener("click", () => {
        // Deselect any previously selected song
        document.querySelectorAll(".cc_ondemand_content div").forEach((div) =>
          div.classList.remove("selected")
        );

        // Select current song
        songDiv.classList.add("selected");
        selectedSong = song; // Store selected song
        playButton.disabled = false; // Enable the request button
      });

      songListDiv.appendChild(songDiv);
    });

    // Handle empty results
    if (filteredSongs.length === 0) {
      songListDiv.innerHTML = "<p>No matching songs found.</p>";
    }
  };

  // Request selected song
  const requestSong = async (song) => {
    // Example of sending a request to AutoDJ API
    try {
      const response = await fetch("https://your-autodj-api.com/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ song: song }),
      });

      if (response.ok) {
        alert(`Song "${song}" has been added to the queue!`);
      } else {
        alert("Failed to request song. Please try again.");
      }
    } catch (error) {
      console.error("Error requesting song:", error);
      alert("An error occurred. Please check your connection.");
    }
  };

  // Search Input Event Listener
  searchInput.addEventListener("input", (e) => {
    renderSongs(e.target.value); // Filter songs dynamically
  });

  // Play Selected Button Event Listener
  playButton.addEventListener("click", () => {
    if (selectedSong) {
      requestSong(selectedSong); // Request the selected song
    }
  });

  // Initialize songs on page load
  initSongs();
});
