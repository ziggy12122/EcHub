function fetchStats() {
  const username = document.getElementById("username").value;
  const platform = document.getElementById("platform").value;
  const output = document.getElementById("stats-output");

  fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${username}&platform=${platform}`)
    .then(res => res.json())
    .then(data => {
      const stats = data.data.stats.all.overall;
      output.innerHTML = `
        <h3>Stats for ${data.data.account.name}</h3>
        <ul>
          <li><strong>Matches:</strong> ${stats.matches}</li>
          <li><strong>Kills:</strong> ${stats.kills}</li>
          <li><strong>Wins:</strong> ${stats.wins}</li>
          <li><strong>K/D:</strong> ${stats.kd}</li>
          <li><strong>Win %:</strong> ${stats.winRate}%</li>
          <li><strong>Time Played:</strong> ${stats.minutesPlayed} minutes</li>
        </ul>
      `;
    })
    .catch(err => {
      output.innerHTML = "Failed to load stats. Check username or try again.";
      console.error(err);
    });
}