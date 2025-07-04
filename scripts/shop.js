fetch("https://fortnite-api.com/v2/shop")
  .then(res => {
    if (!res.ok) throw new Error("Shop API failed");
    return res.json();
  })
  .then(data => {
    const items = data.data?.featured?.entries || [];
    const shopGrid = document.getElementById("item-shop");
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
    const shopGrid = document.getElementById("item-shop");
    shopGrid.innerHTML = `<p class="error">❌ Failed to load shop data. ${err.message}</p>`;
    console.error(err);
  });