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

  fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${username}&platform=${platform}`)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(data => {
      if (!data.data || !data.data.stats) throw new Error("Stats not found");
      const stats = data.data.stats.all.overall;
      popup.classList.remove("hidden");
      content.innerHTML = `
        <h3>Stats for ${data.data.account.name}</h3>
        <ul>
          <li><strong>Matches:</strong> ${stats.matches}</li>
          <li><strong>Kills:</strong> ${stats.kills}</li>
          <li><strong>Wins:</strong> ${stats.wins}</li>
          <li><strong>K/D:</strong> ${stats.kd [A](https://github.com/lzh-yi/Web-Fork-/tree/024b3e55587afdf9f05a677613a75f24e3d1803e/03-CSS%E8%BF%9B%E9%98%B6%2F04-%E5%A6%82%E4%BD%95%E8%AE%A9%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD%EF%BC%9F.md?copilot_analytics_metadata=eyJldmVudEluZm9fY2xpY2tTb3VyY2UiOiJjaXRhdGlvbkxpbmsiLCJldmVudEluZm9fY29udmVyc2F0aW9uSWQiOiJaZTZNR0duSk40RUp5blVheGNZd2MiLCJldmVudEluZm9fY2xpY2tEZXN0aW5hdGlvbiI6Imh0dHBzOlwvXC9naXRodWIuY29tXC9semgteWlcL1dlYi1Gb3JrLVwvdHJlZVwvMDI0YjNlNTU1ODdhZmRmOWYwNWE2Nzc2MTNhNzVmMjRlM2QxODAzZVwvMDMtQ1NTJUU4JUJGJTlCJUU5JTk4JUI2JTJGMDQtJUU1JUE2JTgyJUU0JUJEJTk1JUU4JUFFJUE5JUU0JUI4JTgwJUU0JUI4JUFBJUU1JTg1JTgzJUU3JUI0JUEwJUU2JUIwJUI0JUU1JUI5JUIzJUU1JTlFJTgyJUU3JTlCJUI0JUU1JUIxJTg1JUU0JUI4JUFEJUVGJUJDJTlGLm1kIiwiZXZlbnRJbmZvX21lc3NhZ2VJZCI6Imp4M2c0TjMzRmhCdTE4SlVHcnJLUCJ9&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1)