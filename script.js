document.addEventListener("DOMContentLoaded", () => {
  // Song Request Form Handling
  const submitRequest = document.getElementById("submitRequest");
  const resultMessage = document.getElementById("resultMessage");

  submitRequest.addEventListener("click", () => {
    resultMessage.textContent = "Submitting request...";
    // Trigger Centova's request form handler
    const event = new Event("click");
    submitRequest.dispatchEvent(event);
  });

  // On-Demand Playlist Filtering
  window.filterSongs = () => {
    const filterInput = document.getElementById("filterInput").value.toLowerCase();
    const songs = document.querySelectorAll(".cc_ondemand_content div");

    songs.forEach((song) => {
      const text = song.textContent.toLowerCase();
      song.style.display = text.includes(filterInput) ? "block" : "none";
    });
  };

  // On-Demand Content Handling
  const onDemandContent = document.getElementById("onDemandContent");

  onDemandContent.addEventListener("ondemandload", () => {
    const items = document.querySelectorAll(".cc_ondemand_content div");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        alert(`Playing: ${item.textContent}`);
        // Add song playback logic here
      });
    });
  });
});
