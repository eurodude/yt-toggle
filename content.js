function toggleDiv(divId) {
  const el = document.getElementById(divId);
  if (el) {
    el.style.display = (el.style.display === "none") ? "flex" : "none";
  }
}

// Example: toggle a div with ID "columns" when extension icon is clicked
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "toggleDiv") {
    toggleDiv("columns");
  }
});
