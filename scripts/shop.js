let useFallback = false;

function loadShop() {
  const shopGrid = document.getElementById("item-shop");
  const fallbackCard = document.getElementById("fallback-card");

  if (useFallback) {
    shopGrid.innerHTML = "";
    fallbackCard.classList.remove("hidden");
    return;
  }

  fallbackCard.classList.add("hidden");
  shopGrid.innerHTML = "<p>🔄 Fetching item shop...</p>";

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
      loadShop();
    });
}

function toggleShopSource() {
  useFallback = !useFallback;
  loadShop();
  const toggleBtn = document.getElementById("shop-toggle");
  toggleBtn.innerText = useFallback ? "💾 View Live API Shop" : "📦 View Fallback Shop";
}

function toggleFallbackView() {
  const iframe = document.getElementById("fallback-frame");
  const btn = document.getElementById("minimize-btn");

  if (iframe.style.display === "none") {
    iframe.style.display = "block";
    btn.innerText