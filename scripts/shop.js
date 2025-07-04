let useFallback = false;

function loadShop() {
  const shopGrid = document.getElementById("item-shop");
  shopGrid.innerHTML = "<p>🔄 Fetching item shop...</p>";

  if (useFallback) {
    shopGrid.innerHTML = `
      <p class="error">📦 Showing fallback shop from fnbr.co</p>
      <iframe src="https://fnbr.co/shop" width="100%" height="600" style="border:none; border-radius:8px;"></iframe>
    `;
    return;
  }

  fetch("https://fortnite-api.com/v2/shop")
    .then(res => {
      if (!res.ok) throw new Error("Shop API failed");
      return res.json();
    })
    .then(data => {
      const items = data.data?.featured?.entries || [];

      if (!items.length) throw new Error("No featured items available");

      shopGrid.innerHTML = "";
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
      console.warn("Live shop failed:", err.message);
      useFallback = true;
      loadShop(); // Retry with fallback
    });
}

function toggleShopSource() {
  useFallback = !useFallback;
  loadShop();
  const toggleBtn = document.getElementById("shop-toggle");
  toggleBtn.innerText = useFallback ? "💾 View Live API Shop" : "📦 View Fallback Shop";
}

loadShop();