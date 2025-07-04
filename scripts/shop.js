function loadShop() {
  const shopGrid = document.getElementById("item-shop");
  shopGrid.innerHTML = "<p>🔄 Fetching latest item shop...</p>";

  fetch("https://fortnite-api.com/v2/shop")
    .then(res => {
      if (!res.ok) throw new Error("Shop API failed");
      return res.json();
    })
    .then(data => {
      const items = data.data?.featured?.entries || [];

      if (!items.length) {
        shopGrid.innerHTML = `
          <p class="error">⚠️ No featured items available at the moment. Epic may be updating the shop -- try again shortly.</p>
          <button onclick="loadShop()">🔁 Retry Loading Shop</button>
        `;
        return;
      }

      shopGrid.innerHTML = ""; // Clear placeholder

      items.forEach(entry => {
        const price = entry.finalPrice ?? "Unknown";

        entry.items?.forEach(item => {
          const div = document.createElement("div");
          div.className = "shop-item";
          div.innerHTML = `
            <img src="${item.images?.icon}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <div class="rarity">${item.rarity?.name ?? "Unspecified"}</div>
            <div class="price">${price} V-Bucks</div>
          `;
          shopGrid.appendChild(div);
        });
      });
    })
    .catch(err => {
      shopGrid.innerHTML = `
        <p class="error">❌ Failed to load shop data. ${err.message}</p>
        <button onclick="loadShop()">🔁 Retry</button>
      `;
      console.error("Shop Load Error:", err);
    });
}

// Call on page load
loadShop();