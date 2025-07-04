function toggleTutorial(event, id) {
  event.stopPropagation();
  const list = document.getElementById(id);
  list.classList.toggle("hidden");
  console.log(`Toggled tutorial list: ${id}`);
}

function trackPlatform(platform) {
  console.log(`Clicked platform card: ${platform}`);
}