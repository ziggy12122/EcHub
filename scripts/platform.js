function toggleTutorial(event, id) {
  event.stopPropagation(); // Prevent platform tracking
  const list = document.getElementById(id);
  list.classList.toggle("hidden");
  console.log(`Toggled tutorial list: ${id}`);
}

function openTutorial(platform) {
  console.log(`Tutorial button clicked for ${platform}`);
  // Optional: redirect or open modal logic
}

function trackPlatform(platform) {
  console.log(`Platform card clicked: ${platform}`);
}