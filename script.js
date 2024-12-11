document.addEventListener("DOMContentLoaded", () => {
  // Request Form Handling
  const submitRequest = document.getElementById("submitRequest");
  const resultMessage = document.getElementById("resultMessage");

  submitRequest.addEventListener("click", () => {
    resultMessage.textContent = "Submitting request...";
    // Use the existing Centova form handling
    const event = new Event("click");
    submitRequest.dispatchEvent(event);
  });

  // On-Demand Content Handling
  const onDemandContent = document.getElementById("onDemandContent");

  // Use Centova's existing ondemand.js to populate content
  onDemandContent.addEventListener("ondemandload", () => {
    const items = document.querySelectorAll(".cc_ondemand_content div");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        alert(`Selected song: ${item.textContent}`);
        // Additional functionality can be added here
      });
    });
  });
});
