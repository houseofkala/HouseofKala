// =========================================
// HOUSE OF KĀLA — SHARED CART & STRAP LOGIC
// Persists cart items in localStorage across
// index.html, cart.html, and checkout.html
// =========================================

const HOK_CART_KEY = "house_of_kala_cart_v1";

// Dropdown strap options from straps.jpeg (all priced at 0 extra for now)
const DROPDOWN_STRAP_OPTIONS = [
  { id: "black-woven-nylon", label: "Black Woven Nylon Strap", extraInr: 0, extraUsd: 0 },
  { id: "black-matte-fabric", label: "Black Matte Canvas / Fabric Strap", extraInr: 0, extraUsd: 0 },
  { id: "black-smooth-leather", label: "Smooth Black Leather Strap", extraInr: 0, extraUsd: 0 },
  { id: "brown-croc-leather", label: "Brown Croc-Embossed Leather Strap", extraInr: 0, extraUsd: 0 }
];

function watchHasSteelBracelet(watch) {
  if (!watch) return false;
  if (watch.allowStrapSelection === false) return true;
  if (watch.allowStrapSelection === true) return false;
  const strapText = (watch.bracelet || "").toLowerCase();
  return strapText.includes("steel") || strapText.includes("link bracelet");
}

function getWatchStrapOptions(watch) {
  if (watch && Array.isArray(watch.strapOptions) && watch.strapOptions.length > 0) {
    return watch.strapOptions;
  }

  if (watchHasSteelBracelet(watch)) {
    return [
      {
        id: "original-steel",
        label: watch && watch.bracelet ? watch.bracelet : "Stainless Steel Bracelet",
        extraInr: 0,
        extraUsd: 0
      }
    ];
  }

  const picturedLabel = watch && watch.bracelet ? `${watch.bracelet} (As Pictured)` : "Strap As Pictured";
  const firstOption = {
    id: "pictured-strap",
    label: picturedLabel,
    extraInr: 0,
    extraUsd: 0
  };

  const extraOptions = DROPDOWN_STRAP_OPTIONS.filter(
    (opt) => opt.label.toLowerCase() !== (watch && watch.bracelet ? watch.bracelet.toLowerCase() : "")
  );

  return [firstOption, ...extraOptions.map((opt) => ({ ...opt }))];
}

function getHouseOfKalaCart() {
  try {
    const raw = localStorage.getItem(HOK_CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveHouseOfKalaCart(cartItems) {
  localStorage.setItem(HOK_CART_KEY, JSON.stringify(cartItems));
  syncCartCounters();
}

function getCartTotalCount(cartItems = getHouseOfKalaCart()) {
  return cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
}

function isWatchInCart(watchId, cartItems = getHouseOfKalaCart()) {
  return cartItems.some((item) => Number(item.watchId) === Number(watchId));
}

function isWatchUnavailableOrInCart(watch) {
  if (!watch) return true;
  const stockCount = typeof watch.stock === "number" ? watch.stock : 1;
  return Boolean(watch.soldOut) || stockCount <= 0 || isWatchInCart(watch.id);
}

function syncCartCounters() {
  const count = getCartTotalCount();
  const navCartLink = document.getElementById("navCartLink");
  const mobileCartPill = document.getElementById("mobileCartPill");
  const mobileMenuCartLink = document.getElementById("mobileMenuCartLink");

  if (navCartLink) {
    navCartLink.textContent = count > 0 ? `Cart (${count})` : "Cart";
  }
  if (mobileCartPill) {
    mobileCartPill.textContent = count > 0 ? `Cart • ${count}` : "Cart";
  }
  if (mobileMenuCartLink) {
    mobileMenuCartLink.textContent = count > 0 ? `Cart (${count})` : "Cart";
  }
}

function getUnitPricesWithStrap(watch, strapOptionId) {
  const baseInr = Number(watch.priceInr) || 0;
  const baseUsd = Number(watch.priceUsd) || 0;
  const options = getWatchStrapOptions(watch);
  const chosen = options.find((opt) => opt.id === strapOptionId) || options[0];

  const extraInr = chosen ? Number(chosen.extraInr) || 0 : 0;
  const extraUsd = chosen ? Number(chosen.extraUsd) || 0 : 0;

  return {
    unitInr: baseInr + extraInr,
    unitUsd: baseUsd + extraUsd,
    extraInr,
    extraUsd,
    strapLabel: chosen ? chosen.label : watch.bracelet || "Standard Strap",
    strapId: chosen ? chosen.id : "pictured-strap"
  };
}

function addWatchToCart(watchId, quantity = 1, strapOptionId = null) {
  if (typeof watches === "undefined") return false;
  const watch = watches.find((w) => w.id === watchId);
  if (!watch || watch.soldOut) return false;

  const options = getWatchStrapOptions(watch);
  const selectedStrapId = strapOptionId || (options[0] && options[0].id) || "pictured-strap";
  const pricing = getUnitPricesWithStrap(watch, selectedStrapId);

  const cart = getHouseOfKalaCart();
  const lineKey = `${watch.id}::${pricing.strapId}`;
  const existingIndex = cart.findIndex((item) => item.lineKey === lineKey);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += Math.max(1, Number(quantity) || 1);
  } else {
    cart.push({
      lineKey,
      watchId: watch.id,
      brand: watch.brand,
      name: watch.name,
      image: (watch.images && watch.images[0]) || "",
      baseInr: Number(watch.priceInr) || 0,
      baseUsd: Number(watch.priceUsd) || 0,
      strapId: pricing.strapId,
      strapLabel: pricing.strapLabel,
      extraInr: pricing.extraInr,
      extraUsd: pricing.extraUsd,
      unitInr: pricing.unitInr,
      unitUsd: pricing.unitUsd,
      quantity: Math.max(1, Number(quantity) || 1)
    });
  }

  saveHouseOfKalaCart(cart);
  return true;
}

function updateCartItemQuantity(lineKey, delta) {
  const cart = getHouseOfKalaCart();
  const idx = cart.findIndex((item) => item.lineKey === lineKey);
  if (idx === -1) return;

  const nextQty = (Number(cart[idx].quantity) || 1) + delta;
  if (nextQty <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx].quantity = nextQty;
  }

  saveHouseOfKalaCart(cart);
  renderCartPage();
}

function removeCartItem(lineKey) {
  const nextCart = getHouseOfKalaCart().filter((item) => item.lineKey !== lineKey);
  saveHouseOfKalaCart(nextCart);
  renderCartPage();
}

function clearHouseOfKalaCart() {
  saveHouseOfKalaCart([]);
  renderCartPage();
}

function formatDualCurrency(inr, usd) {
  return `₹${Number(inr || 0).toLocaleString("en-IN")} • $${Number(usd || 0).toLocaleString("en-US")}`;
}

function renderCartPage() {
  const container = document.getElementById("cartItemsContainer");
  const summaryPanel = document.getElementById("cartSummaryPanel");
  const summaryText = document.getElementById("cartItemSummary");
  const subtotalDisplay = document.getElementById("cartSubtotalDisplay");

  syncCartCounters();
  if (!container) return;

  const cart = getHouseOfKalaCart();
  const totalCount = getCartTotalCount(cart);

  if (summaryText) {
    summaryText.textContent = `${totalCount} ${totalCount === 1 ? "item" : "items"} in cart`;
  }

  if (cart.length === 0) {
    if (summaryPanel) summaryPanel.style.display = "none";
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 1.65rem; margin-bottom: 14px;">Your cart is currently empty.</p>
        <a href="index.html#catalog" class="btn-primary">Explore Timepieces</a>
      </div>
    `;
    return;
  }

  if (summaryPanel) summaryPanel.style.display = "block";

  let totalInr = 0;
  let totalUsd = 0;

  container.innerHTML = cart
    .map((item) => {
      const qty = Number(item.quantity) || 1;
      const lineInr = (Number(item.unitInr) || 0) * qty;
      const lineUsd = (Number(item.unitUsd) || 0) * qty;
      totalInr += lineInr;
      totalUsd += lineUsd;

      const strapNote =
        item.extraInr > 0 || item.extraUsd > 0
          ? `${item.strapLabel} (+${formatDualCurrency(item.extraInr, item.extraUsd)})`
          : item.strapLabel;

      return `
        <article class="watch-card">
          <span class="card-eyebrow">${item.brand}</span>
          <div class="card-media-stage">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </div>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-meta">Strap: ${strapNote}</p>
          <p class="card-price">${formatDualCurrency(lineInr, lineUsd)}</p>
          <div class="cart-item-actions">
            <div class="cart-qty-controls">
              <button type="button" class="btn-primary cart-qty-btn" onclick="updateCartItemQuantity('${item.lineKey}', -1)">−</button>
              <span class="cart-qty-value">${qty}</span>
              <button type="button" class="btn-primary cart-qty-btn" onclick="updateCartItemQuantity('${item.lineKey}', 1)">+</button>
            </div>
            <button type="button" class="nav-link cart-remove-btn" onclick="removeCartItem('${item.lineKey}')">
              Remove
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  if (subtotalDisplay) {
    subtotalDisplay.textContent = formatDualCurrency(totalInr, totalUsd);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  syncCartCounters();
  renderCartPage();
});
