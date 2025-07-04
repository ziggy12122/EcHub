function fetchStats() {
  const username = document.getElementById("username").value.trim();
  const platform = document.getElementById("platform").value;
  const popup = document.getElementById("popup-card");
  const content = document.getElementById("popup-content");

  if (!username) {
    content.innerHTML = `<p class="error">Please enter a valid Epic username.</p>`;
    popup.classList.remove("hidden");
    return;
  }

  console.log(`Stat search initiated: ${username} on ${platform}`);

  fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${username}&platform=${platform}`)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(data => {
      const stats = data.data?.stats?.all?.overall;
      const name = data.data?.account?.name;

      if (!stats || !name) throw new Error("Stats not found or malformed data");

      content.innerHTML = `
        <h3>Stats for ${name}</h3>
        <ul>
          <li><strong>Matches:</strong> ${stats.matches}</li>
          <li><strong>Kills:</strong> ${stats.kills}</li>
          <li><strong>Wins:</strong> ${stats.wins}</li>
          <li><strong>K/D:</strong> ${stats.kd}</li>
          <li><strong>Win %:</strong> ${stats.winRate}%</li>
          <li><strong>Time Played:</strong> ${stats.minutesPlayed} minutes</li>
        </ul>
      `;
      popup.classList.remove("hidden");
    })
    .catch(err => {
      content.innerHTML = `<p class="error">❌ Failed to load stats. ${err.message}</p>`;
      popup.classList.remove("hidden");
      console.error("Stats Fetch Error:", err);
    });
}

function clearStats() {
  document.getElementById("username").value = "";
  document.getElementById("platform").value = "pc";
  closePopup();
}

function closePopup() {
  const popup = document.getElementById("popup-card");
  const content = document.getElementById("popup-content");
  popup.classList.add("hidden");
  content.innerHTML = "";
}