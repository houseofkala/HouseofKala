// =========================================
// HOUSE OF KĀLA — INVENTORY DATA
// Set `priceInr` and `priceUsd` independently per watch.
// =========================================
const watches = [
  {
    id: 1,
    brand: "Citizen",
    name: "Citizen Elegance Triple Calendar",
    year: "1980s - 1990s",
    movement: "Quartz",
    condition: "Mint",
    bracelet: "Dark Brown Alligator/Croc Embossed Leather",
    caseSize: "35mm Stainless Steel",
    caliber: "Citizen 6355 Quartz",
    priceInr: 25000,
    priceUsd: 250,
    description:
      "Vintage Citizen Elegance Triple Calendar featuring day, date, and month indicators, a refined 35mm stainless steel case, and a dark brown embossed leather strap.",
    images: [
      "./images/citizen/1.jpeg",
      "./images/citizen/2.jpeg",
      "./images/citizen/3.jpeg",
      "./images/citizen/4.jpeg"
    ]
  },
  {
    id: 2,
    brand: "HMT",
    name: "HMT Janata",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    bracelet: "Mustard Suede Strap",
    caseSize: "35–36 mm Polished Stainless Steel",
    caliber: "HMT Caliber 0231 (17 Jewels, Citizen 0201 Architecture)",
    priceInr: 3500,
    priceUsd: 45,
    description:
      "Classic Indian horology featuring a silver radial sunburst dial, red-tipped central sweeping seconds hand, 17-jewel hand-wound mechanical movement, and a warm mustard-tan suede strap. Refurbished, inspected, and ready for the wrist.",
    images: [
      "./images/HMT Janata/1.jpeg",
      "./images/HMT Janata/2.jpeg",
      "./images/HMT Janata/3.jpeg",
      "./images/HMT Janata/4.jpeg"
    ]
  }
];

let selectedBrand = "all";
let activeWatch = null;
let activeImageIndex = 0;

// DOM Elements
const siteHeader = document.getElementById("siteHeader");
const watchmakersTrigger = document.getElementById("watchmakersTrigger");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const menuBackdrop = document.getElementById("menuBackdrop");
const watchGrid = document.getElementById("watchGrid");
const catalogHeading = document.getElementById("catalogHeading");
const itemCount = document.getElementById("itemCount");
const activeBrandBadge = document.getElementById("activeBrandBadge");
const badgeText = document.getElementById("badgeText");

// Modal DOM Elements
const productModalBackdrop = document.getElementById("productModalBackdrop");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalPhotoTrack = document.getElementById("modalPhotoTrack");
const prevImgBtn = document.getElementById("prevImgBtn");
const nextImgBtn = document.getElementById("nextImgBtn");
const galleryDots = document.getElementById("galleryDots");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSpecsList = document.getElementById("modalSpecsList");

// =========================================
// MANUAL INR + USD PRICE FORMATTING
// =========================================
function formatManualDualPrice(watch) {
  const inrText = `₹${Number(watch.priceInr).toLocaleString("en-IN")}`;
  const usdText = `$${Number(watch.priceUsd).toLocaleString("en-US")}`;
  return `${inrText} • ${usdText}`;
}

// =========================================
// MEGA MENU INTERACTION (DESKTOP & MOBILE)
// =========================================
function openMenu() {
  siteHeader.classList.add("menu-open");
  menuBackdrop.classList.add("active");
  if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-expanded", "true");
  const triggerBtn = watchmakersTrigger && watchmakersTrigger.querySelector("button");
  if (triggerBtn) triggerBtn.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  siteHeader.classList.remove("menu-open");
  menuBackdrop.classList.remove("active");
  if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-expanded", "false");
  const triggerBtn = watchmakersTrigger && watchmakersTrigger.querySelector("button");
  if (triggerBtn) triggerBtn.setAttribute("aria-expanded", "false");
}

watchmakersTrigger.addEventListener("mouseenter", () => {
  if (window.innerWidth > 860) openMenu();
});

// Close dropdown as soon as cursor moves onto other nav items or logo
document.querySelectorAll(".main-nav .nav-item:not(#watchmakersTrigger), .brand-logo").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (window.innerWidth > 860) closeMenu();
  });
});

// Close when cursor moves into the page below the mega menu
document.addEventListener("mouseover", (e) => {
  if (window.innerWidth > 860 && siteHeader.classList.contains("menu-open")) {
    if (!e.target.closest(".site-header")) {
      closeMenu();
    }
  }
});

watchmakersTrigger.addEventListener("click", () => {
  siteHeader.classList.contains("menu-open") ? closeMenu() : openMenu();
});

mobileMenuBtn.addEventListener("click", () => {
  siteHeader.classList.contains("menu-open") ? closeMenu() : openMenu();
});

menuBackdrop.addEventListener("click", closeMenu);

// =========================================
// FILTERING & SORTING LOGIC
// =========================================
function selectBrandFromMenu(brand) {
  selectedBrand = brand;
  closeMenu();
  updateHeaderBadge();
  applyFilters();
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
}

function filterByBrand(brand) {
  selectedBrand = brand;
  updateHeaderBadge();
  applyFilters();
}

function resetAllFilters() {
  selectedBrand = "all";
  document.getElementById("movementFilter").value = "all";
  document.getElementById("conditionFilter").value = "all";
  document.getElementById("priceSort").value = "featured";
  updateHeaderBadge();
  applyFilters();
}

function updateHeaderBadge() {
  if (selectedBrand !== "all") {
    activeBrandBadge.style.display = "inline-flex";
    badgeText.textContent = selectedBrand;
    catalogHeading.textContent = `${selectedBrand} Timepieces`;
  } else {
    activeBrandBadge.style.display = "none";
    catalogHeading.textContent = "All Timepieces";
  }
}

function applyFilters() {
  const movement = document.getElementById("movementFilter").value;
  const condition = document.getElementById("conditionFilter").value;
  const sortOrder = document.getElementById("priceSort").value;

  let filtered = watches.filter((watch) => {
    const matchBrand = selectedBrand === "all" || watch.brand === selectedBrand;
    const matchMovement = movement === "all" || watch.movement === movement;
    const matchCondition = condition === "all" || watch.condition === condition;
    return matchBrand && matchMovement && matchCondition;
  });

  if (sortOrder === "low-to-high") {
    filtered.sort((a, b) => a.priceInr - b.priceInr);
  } else if (sortOrder === "high-to-low") {
    filtered.sort((a, b) => b.priceInr - a.priceInr);
  }

  renderWatches(filtered);
}

function renderWatches(list) {
  itemCount.textContent = `Showing ${list.length} curated ${list.length === 1 ? "watch" : "watches"}`;

  if (list.length === 0) {
    watchGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 1.65rem; margin-bottom: 14px;">No timepieces match this exact combination.</p>
        <button type="button" class="btn-primary" onclick="resetAllFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  watchGrid.innerHTML = list
    .map((w) => {
      const coverSrc = (w.images && w.images[0]) || "";
      return `
        <article class="watch-card" onclick="openProductModal(${w.id})">
          <span class="card-eyebrow">${w.brand} &bull; ${w.condition}</span>
          <div class="card-media-stage">
            <img src="${coverSrc}" alt="${w.name}" loading="lazy" />
          </div>
          <h3 class="card-title">${w.name}</h3>
          <p class="card-meta">${w.year} &bull; ${w.movement}</p>
          <p class="card-price">${formatManualDualPrice(w)}</p>
        </article>
      `;
    })
    .join("");
}

// =========================================
// FULL PRODUCT DETAIL MODAL + SCROLL GALLERY
// =========================================
function openProductModal(watchId) {
  const watch = watches.find((w) => w.id === watchId);
  if (!watch) return;

  activeWatch = watch;
  activeImageIndex = 0;

  modalEyebrow.textContent = `${watch.brand} • ${watch.year}`;
  modalTitle.textContent = watch.name;
  modalPrice.textContent = formatManualDualPrice(watch);
  modalDescription.textContent = watch.description;

  renderModalGallery();
  renderModalSpecs();

  productModalBackdrop.classList.add("open");
  productModalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalPhotoTrack.scrollLeft = 0;
}

function closeProductModal() {
  productModalBackdrop.classList.remove("open");
  productModalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderModalGallery() {
  const imgs = activeWatch.images || [];

  modalPhotoTrack.innerHTML = imgs
    .map(
      (src, idx) => `
      <div class="modal-slide">
        <img src="${src}" alt="${activeWatch.name} — view ${idx + 1}" />
      </div>
    `
    )
    .join("");

  galleryDots.innerHTML = imgs
    .map(
      (_, idx) => `
      <button
        type="button"
        class="gallery-dot ${idx === activeImageIndex ? "active" : ""}"
        aria-label="View photo ${idx + 1}"
        onclick="scrollToGalleryIndex(${idx})"
      ></button>
    `
    )
    .join("");

  const showArrows = imgs.length > 1;
  prevImgBtn.style.display = showArrows ? "grid" : "none";
  nextImgBtn.style.display = showArrows ? "grid" : "none";
}

function scrollToGalleryIndex(idx) {
  const imgs = (activeWatch && activeWatch.images) || [];
  if (imgs.length === 0) return;

  const clamped = Math.max(0, Math.min(idx, imgs.length - 1));
  activeImageIndex = clamped;
  modalPhotoTrack.scrollTo({
    left: clamped * modalPhotoTrack.clientWidth,
    behavior: "smooth"
  });
  updateDots();
}

function updateDots() {
  const dots = galleryDots.querySelectorAll(".gallery-dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeImageIndex);
  });
}

modalPhotoTrack.addEventListener("scroll", () => {
  if (!modalPhotoTrack.clientWidth) return;
  const newIndex = Math.round(modalPhotoTrack.scrollLeft / modalPhotoTrack.clientWidth);
  if (newIndex !== activeImageIndex) {
    activeImageIndex = newIndex;
    updateDots();
  }
});

prevImgBtn.addEventListener("click", () => {
  const total = (activeWatch && activeWatch.images && activeWatch.images.length) || 0;
  if (total > 0) {
    scrollToGalleryIndex((activeImageIndex - 1 + total) % total);
  }
});

nextImgBtn.addEventListener("click", () => {
  const total = (activeWatch && activeWatch.images && activeWatch.images.length) || 0;
  if (total > 0) {
    scrollToGalleryIndex((activeImageIndex + 1) % total);
  }
});

function renderModalSpecs() {
  const rows = [
    { label: "Watchmaker", value: activeWatch.brand },
    { label: "Era / Year", value: activeWatch.year },
    { label: "Movement", value: activeWatch.movement },
    { label: "Caliber", value: activeWatch.caliber },
    { label: "Case", value: activeWatch.caseSize },
    { label: "Bracelet / Strap", value: activeWatch.bracelet },
    { label: "Condition Grade", value: activeWatch.condition }
  ];

  modalSpecsList.innerHTML = rows
    .map(
      (r) => `
      <div class="spec-row">
        <span class="spec-label">${r.label}</span>
        <span class="spec-value">${r.value}</span>
      </div>
    `
    )
    .join("");
}

closeModalBtn.addEventListener("click", closeProductModal);

productModalBackdrop.addEventListener("click", (e) => {
  if (e.target === productModalBackdrop) {
    closeProductModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && productModalBackdrop.classList.contains("open")) {
    closeProductModal();
  }
});

// Initial render
applyFilters();
