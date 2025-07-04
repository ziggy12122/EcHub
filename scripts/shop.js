fetch("https://fortnite-api.com/v2/shop")
  .then(res => res.json())
  .then(data => {
    const items = data.data.featured?.entries || [];
    const shopGrid = document.getElementById("item-shop");
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
    document.getElementById("item-shop").innerText = "Failed to load shop data.";
    console.error("API Error:", err);
  });