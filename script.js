document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const songListDiv = document.getElementById("songList");
  const playButton = document.getElementById("playSelected");

  let songs = []; // Real song data fetched from backend
  let selectedSong = null; // Track the selected song

  // Fetch songs from /petvoj
  const fetchSongs = async () => {
    try {
      const response = await fetch("https://control.internet-radio.com:2199/start/petvoj");
      if (response.ok) {
        const data = await response.json();
        return data.songs || []; // Ensure we get the songs array
      } else {
        console.error("Failed to fetch songs from /petvoj");
        return [];
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
      return [];
    }
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

  // Request the selected song
  const requestSong = async (song) => {
    try {
      const response = await fetch("https://control.internet-radio.com:2199/start/petvoj", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ request: song }),
      });

      if (response.ok) {
        alert(`Song "${song}" has been added to the queue!`);
      } else {
        alert("Failed to request the song. Please try again.");
      }
    } catch (error) {
      console.error("Error requesting song:", error);
      alert("An error occurred. Please check your connection.");
    }
  };

  // Initialize songs on page load
  const initSongs = async () => {
    songs = await fetchSongs();
    renderSongs(); // Render all songs initially
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

  // Fetch and display songs on load
  initSongs();
});

