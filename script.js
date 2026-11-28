// =========================================
// HOUSE OF KĀLA — INVENTORY DATA & SHEET SYNC
// Set `INVENTORY_SHEET_CSV_URL` to your published
// Google Sheet CSV URL to sync stock & soldOut state.
// =========================================
const INVENTORY_SHEET_CSV_URL = "";
const STRAPS_REFERENCE_IMAGE = "./images/straps.jpeg";

const watches = [
  {
    id: 1,
    brand: "Citizen",
    name: "Citizen Elegance Triple Calendar",
    year: "1980s - 1990s",
    movement: "Quartz",
    condition: "Mint",
    soldOut: true,
    stock: 0,
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
      "./images/citizen/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 2,
    brand: "HMT",
    name: "HMT Janata",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
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
      "./images/HMT Janata/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 3,
    brand: "Hoga",
    name: "Hoga Automatic Jump Hour",
    year: "1970s",
    movement: "Automatic",
    condition: "Patina",
    stock: 1,
    bracelet: "Integrated Stainless Steel Link Bracelet",
    caseSize: "Hooded Space-Age Rectangular Case",
    caliber: "Swiss 17-Jewel Automatic Direct-Read",
    priceInr: 0,
    priceUsd: 0,
    description:
      "1970s Swiss space-age direct-read jump hour automatic featuring rotating hour, minute, and seconds discs behind a cobalt blue metallic dial plate with a vibrant orange-red center pointer and integrated link bracelet.",
    images: [
      "./images/hoga auto/1.jpeg",
      "./images/hoga auto/2.jpeg",
      "./images/hoga auto/3.jpeg",
      "./images/hoga auto/4.jpeg",
      "./images/hoga auto/5.jpeg"
    ]
  },
  {
    id: 4,
    brand: "Orient",
    name: "Orient Crystal 21 Jewels (Lime TV Dial)",
    year: "1970s",
    movement: "Automatic",
    condition: "Patina",
    stock: 1,
    bracelet: "Multi-Row Brick-Link Stainless Steel Bracelet",
    caseSize: "Stainless Steel TV-Case (Ref. OS469C033)",
    caliber: "Orient Cal. 46941 / 46943 (21 Jewels, Quick-Set Pusher)",
    priceInr: 0,
    priceUsd: 0,
    description:
      "Vibrant 1970s Japanese cult classic featuring a textured metallic lime-green TV dial, jewel-set hour markers, applied gold Orient crest, bilingual English/Arabic day-date window, and quick-set day pusher at 2 o'clock.",
    images: [
      "./images/orient green/1.jpeg",
      "./images/orient green/2.jpeg",
      "./images/orient green/3.jpeg",
      "./images/orient green/4.jpeg",
      "./images/orient green/5.jpeg"
    ]
  },
  {
    id: 5,
    brand: "Orient",
    name: "Orient Tri-Star Crystal (Espresso TV Dial)",
    year: "1970s",
    movement: "Automatic",
    condition: "Patina",
    stock: 1,
    bracelet: "Vintage Multi-Link Stainless Steel Bracelet",
    caseSize: "Stainless Steel Tonneau TV-Case (Ref. OS469C957)",
    caliber: "Orient Cal. 46941 / 46943 (21 Jewels, Quick-Set Pusher)",
    priceInr: 0,
    priceUsd: 0,
    description:
      "Two-tone espresso and chocolate brown TV-style dial featuring a circular sunburst center chapter, gold-trimmed inner bezel ring, applied Tri-Star emblem, day-date window, and sculpted tonneau steel case.",
    images: [
      "./images/orient maroon/1.jpeg",
      "./images/orient maroon/2.jpeg",
      "./images/orient maroon/3.jpeg",
      "./images/orient maroon/4.jpeg",
      "./images/orient maroon/5.jpeg"
    ]
  },
  {
    id: 6,
    brand: "Favre-Leuba",
    name: "Favre-Leuba Genève Duomatic",
    year: "1970s",
    movement: "Automatic",
    condition: "Patina",
    stock: 1,
    bracelet: "18mm Dark Brown Stitched Genuine Leather Strap",
    caseSize: "Stainless Steel Cushion Case (Ref. 59933 RM)",
    caliber: "Swiss Favre-Leuba Duomatic Automatic",
    priceInr: 0,
    priceUsd: 0,
    description:
      "1970s Swiss dress-sport classic featuring a textured matte terracotta-rust dial, applied gold baton indices, iconic hourglass emblem, framed day-date window, gold-tone fluted crown, and stitched brown leather strap.",
    images: [
      "./images/favreluba red/1.jpeg",
      "./images/favreluba red/2.jpeg",
      "./images/favreluba red/3.jpeg",
      "./images/favreluba red/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 7,
    brand: "HMT",
    name: "HMT Gandaberunda (Kannada Dial)",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Deep Indigo Stitched Genuine Leather Strap",
    caseSize: "Polished Stainless Steel (Exhibition Caseback)",
    caliber: "HMT 17-Jewel Manual Wind Mechanical",
    priceInr: 0,
    priceUsd: 0,
    description:
      "Culturally rich Indian mechanical timepiece featuring a cream dial with Kannada script numerals, blue Gandaberunda emblem, blued steel hands, deep indigo leather strap, and an exhibition caseback revealing the 17-jewel hand-wound movement.",
    images: [
      "./images/hmt gande/1.jpeg",
      "./images/hmt gande/2.jpeg",
      "./images/hmt gande/3.jpeg",
      "./images/hmt gande/4.jpeg",
      "./images/hmt gande/5.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 8,
    brand: "HMT",
    name: "HMT Kohinoor (Dark Dial)",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Black Strap",
    caseSize: "Cushion Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 8000,
    priceUsd: 95,
    description:
      "Vintage HMT Kohinoor manual-wind timepiece featuring a dark dial, applied baton indices, and black strap.",
    images: [
      "./images/hmt kohinoor black/1.jpeg",
      "./images/hmt kohinoor black/2.jpeg",
      "./images/hmt kohinoor black/3.jpeg",
      "./images/hmt kohinoor black/4.jpeg",
      "./images/hmt kohinoor black/5.jpeg",
      "./images/hmt kohinoor black/6.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 9,
    brand: "HMT",
    name: "HMT Janata Deva",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Black Woven Strap",
    caseSize: "Round Dress Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 5000,
    priceUsd: 60,
    description:
      "Vintage HMT Janata manual-wind dress watch with a cream/off-white dial and black woven strap.",
    images: [
      "./images/hmt janata deva/1.jpeg",
      "./images/hmt janata deva/2.jpeg",
      "./images/hmt janata deva/3.jpeg",
      "./images/hmt janata deva/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 10,
    brand: "HMT",
    name: "HMT Vijay (Black Crosshair Dial)",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Black Strap",
    caseSize: "Cushion Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 9000,
    priceUsd: 110,
    description:
      "Vintage HMT Vijay manual-wind watch featuring a black crosshair dial and black strap.",
    images: [
      "./images/hmt vijay black/1.jpeg",
      "./images/hmt vijay black/2.jpeg",
      "./images/hmt vijay black/3.jpeg",
      "./images/hmt vijay black/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 11,
    brand: "HMT",
    name: "HMT Chethan",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Patina",
    stock: 1,
    bracelet: "Brown Croc-Embossed Leather Strap",
    caseSize: "Cushion/Barrel Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 7000,
    priceUsd: 85,
    description:
      "Vintage HMT Chethan manual-wind watch featuring a champagne-gold dial with natural patina on a brown croc-embossed strap.",
    images: [
      "./images/hmt chetan/1.jpeg",
      "./images/hmt chetan/2.jpeg",
      "./images/hmt chetan/3.jpeg",
      "./images/hmt chetan/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 12,
    brand: "HMT",
    name: "HMT Vijay Original (Silver Dial)",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Black Strap",
    caseSize: "Cushion Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 12000,
    priceUsd: 145,
    description:
      "Vintage HMT Vijay manual-wind watch featuring a silver/two-tone brushed dial and black strap.",
    images: [
      "./images/hmt vijay silver/1.jpeg",
      "./images/hmt vijay silver/2.jpeg",
      "./images/hmt vijay silver/3.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 13,
    brand: "Henri Sandoz & Fils",
    name: "Henri Sandoz & Fils",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Patina",
    stock: 1,
    bracelet: "Black Strap",
    caseSize: "Round Stainless Steel Case",
    caliber: "17 Jewels Shock Proof Manual Wind",
    priceInr: 12000,
    priceUsd: 145,
    description:
      "Vintage Henri Sandoz & Fils 17-jewel manual-wind timepiece with an aged cream dial, signed caseback, and black strap.",
    images: [
      "./images/henrysf/1.jpeg",
      "./images/henrysf/2.jpeg",
      "./images/henrysf/3.jpeg",
      "./images/henrysf/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 14,
    brand: "HMT",
    name: "HMT Kohinoor Gold",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Amber Strap",
    caseSize: "Cushion Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 5000,
    priceUsd: 60,
    description:
      "Vintage HMT Kohinoor manual-wind timepiece featuring a brushed gold/champagne dial paired with an amber strap.",
    images: [
      "./images/hmt kohinoor gold/1.jpeg",
      "./images/hmt kohinoor gold/2.jpeg",
      "./images/hmt kohinoor gold/3.jpeg",
      "./images/hmt kohinoor gold/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 15,
    brand: "HMT",
    name: "HMT Ashok",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Black Strap",
    caseSize: "Cushion Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 12000,
    priceUsd: 145,
    description:
      "Vintage HMT Ashok manual-wind watch with a fine brushed champagne/silver dial, red seconds hand, and black strap.",
    images: [
      "./images/hmt ashok/1.jpeg",
      "./images/hmt ashok/2.jpeg",
      "./images/hmt ashok/3.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 16,
    brand: "HMT",
    name: "HMT Chanakya",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Brown Leather Strap",
    caseSize: "Cushion/TV Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 5000,
    priceUsd: 60,
    description:
      "Vintage HMT Chanakya manual-wind timepiece featuring a TV-framed dark dial with gold outer track and brown leather strap.",
    images: [
      "./images/hmt chanakya/1.jpeg",
      "./images/hmt chanakya/2.jpeg",
      "./images/hmt chanakya/3.jpeg",
      "./images/hmt chanakya/4.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 17,
    brand: "Enicar",
    name: "Enicar Automatic Day-Date (Bronze Dial)",
    year: "Vintage",
    movement: "Automatic",
    condition: "Patina",
    stock: 1,
    bracelet: "Stainless Steel Link Bracelet",
    caseSize: "Cushion Steel Case (Dolphin & Saturn Caseback)",
    caliber: "Enicar Automatic (Incabloc, T Swiss Made T)",
    priceInr: 15000,
    priceUsd: 180,
    description:
      "Enicar automatic day-date watch with a warm bronze-patina dial, faceted baton markers, Saturn emblem near 12 o'clock, split MON / 26 day-date windows near 3 o'clock, steel link bracelet, and engraved dolphin + Saturn caseback.",
    images: [
      "./images/enicar/1.jpeg",
      "./images/enicar/2.jpeg",
      "./images/enicar/3.jpeg",
      "./images/enicar/4.jpeg"
    ]
  },
  {
    id: 18,
    brand: "HMT",
    name: "HMT Kohinoor 17 Jewels (Crimson Sunburst Dial)",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Interlocking Steel Link Bracelet",
    caseSize: "Cushion Case",
    caliber: "HMT 17 Jewels Para Shock (Made in India 0231)",
    priceInr: 4000,
    priceUsd: 50,
    description:
      "HMT Kohinoor 17-jewel manual-wind watch featuring a deep crimson/burgundy sunburst dial, silver baton indices with yellow-green lume dots, and interlocking steel link bracelet.",
    images: [
      "./images/hmt kohinoor red/1.jpeg",
      "./images/hmt kohinoor red/2.jpeg",
      "./images/hmt kohinoor red/3.jpeg",
      "./images/hmt kohinoor red/4.jpeg"
    ]
  },
  {
    id: 19,
    brand: "HMT",
    name: "HMT Kohinoor 17 Jewels (Forest Green Sunburst Dial)",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Multi-Row Steel Link Bracelet",
    caseSize: "Cushion Case",
    caliber: "HMT 17 Jewels Para Shock (Made in India 0231)",
    priceInr: 4000,
    priceUsd: 50,
    description:
      "HMT Kohinoor 17-jewel manual-wind watch featuring a dark forest-green sunburst dial, silver baton indices with yellow-green lume dots, and multi-row steel link bracelet.",
    images: [
      "./images/hmt kohinoor green/1.jpeg",
      "./images/hmt kohinoor green/2.jpeg",
      "./images/hmt kohinoor green/3.jpeg",
      "./images/hmt kohinoor green/4.jpeg"
    ]
  },
  {
    id: 20,
    brand: "HMT",
    name: "HMT Gold-Tone Dress Watch (Black Dial)",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Patina",
    stock: 1,
    bracelet: "Black Fabric/Webbing Strap",
    caseSize: "Round Gold-Tone Case",
    caliber: "HMT Shock Jewels Manual Wind",
    priceInr: 8000,
    priceUsd: 95,
    description:
      "Gold-tone round dress watch featuring a dark dial with gold-tone dot markers and Roman numerals (XI, XII), applied HMT emblem, gold-tone hands, and textured black fabric/webbing strap.",
    images: [
      "./images/hmt gold black/1.jpeg",
      "./images/hmt gold black/2.jpeg",
      "./images/hmt gold black/3.jpeg",
      "./images/straps.jpeg"
    ]
  },
  {
    id: 21,
    brand: "HMT",
    name: "HMT Pilot",
    year: "Vintage",
    movement: "Manual Wind",
    condition: "Refurbished",
    stock: 1,
    bracelet: "Strap",
    caseSize: "Standard Vintage Case",
    caliber: "HMT Manual Wind (17 Jewels)",
    priceInr: 4000,
    priceUsd: 50,
    description:
      "Vintage HMT Pilot manual-wind timepiece.",
    images: [
      "./images/hmt pilot/1.jpeg",
      "./images/hmt pilot/2.jpeg",
      "./images/hmt pilot/3.jpeg",
      "./images/hmt pilot/4.jpeg",
      "./images/straps.jpeg"
    ]
  }
];

let selectedBrand = "all";
let activeWatch = null;
let activeImageIndex = 0;
let isSlideZoomed = false;
let selectedModalStrapId = "pictured-strap";
let addToCartResetTimer = null;

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
const productModalCard = document.querySelector(".product-modal-card");
const closeModalBtn = document.getElementById("closeModalBtn");
const galleryScrollerWrap = document.querySelector(".gallery-scroller-wrap");
const modalPhotoTrack = document.getElementById("modalPhotoTrack");
const prevImgBtn = document.getElementById("prevImgBtn");
const nextImgBtn = document.getElementById("nextImgBtn");
const toggleZoomBtn = document.getElementById("toggleZoomBtn");
const zoomBtnIcon = document.getElementById("zoomBtnIcon");
const galleryDots = document.getElementById("galleryDots");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalSpecsList = document.getElementById("modalSpecsList");
const modalStrapSection = document.getElementById("modalStrapSection");
const modalStrapSelect = document.getElementById("modalStrapSelect");
const modalStrapNote = document.getElementById("modalStrapNote");
const modalAddToCartBtn = document.getElementById("modalAddToCartBtn");
const modalViewCartLink = document.getElementById("modalViewCartLink");

// =========================================
// MANUAL INR + USD PRICE FORMATTING
// =========================================
function formatManualDualPrice(watch) {
  const inrText = `₹${Number(watch.priceInr).toLocaleString("en-IN")}`;
  const usdText = `$${Number(watch.priceUsd).toLocaleString("en-US")}`;
  return `${inrText} • ${usdText}`;
}

function isSteelWatch(watch) {
  if (typeof watchHasSteelBracelet === "function") {
    return watchHasSteelBracelet(watch);
  }
  const strapText = ((watch && watch.bracelet) || "").toLowerCase();
  return strapText.includes("steel") || strapText.includes("link bracelet");
}

function getWatchGalleryImages(watch) {
  const imgs = Array.isArray(watch && watch.images) ? [...watch.images] : [];
  if (!isSteelWatch(watch) && !imgs.includes(STRAPS_REFERENCE_IMAGE)) {
    imgs.push(STRAPS_REFERENCE_IMAGE);
  }
  return imgs;
}

function getEffectiveSoldOutState(watch) {
  if (!watch) return true;
  if (typeof isWatchUnavailableOrInCart === "function") {
    return isWatchUnavailableOrInCart(watch);
  }
  const stockCount = typeof watch.stock === "number" ? watch.stock : 1;
  return Boolean(watch.soldOut) || stockCount <= 0;
}

// =========================================
// INVENTORY SHEET CSV SYNC (OPTIONAL)
// =========================================
function parseCsvRows(csvText) {
  const rows = [];
  let current = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const ch = csvText[i];
    const next = csvText[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      current.push(field.trim());
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && next === "\n") i++;
      current.push(field.trim());
      if (current.some((cell) => cell !== "")) {
        rows.push(current);
      }
      current = [];
      field = "";
    } else {
      field += ch;
    }
  }

  if (field.length > 0 || current.length > 0) {
    current.push(field.trim());
    if (current.some((cell) => cell !== "")) {
      rows.push(current);
    }
  }
  return rows;
}

async function syncInventorySheet() {
  if (!INVENTORY_SHEET_CSV_URL) return;
  try {
    const res = await fetch(INVENTORY_SHEET_CSV_URL, { cache: "no-store" });
    if (!res.ok) return;
    const csvText = await res.text();
    const rows = parseCsvRows(csvText);
    if (rows.length < 2) return;

    const headers = rows[0].map((h) => h.toLowerCase());
    const idIdx = headers.indexOf("id");
    const stockIdx = headers.indexOf("stock");
    const soldOutIdx = headers.indexOf("soldout");
    const priceInrIdx = headers.indexOf("priceinr");
    const priceUsdIdx = headers.indexOf("priceusd");

    rows.slice(1).forEach((row) => {
      const watchId = Number(row[idIdx]);
      const target = watches.find((w) => Number(w.id) === watchId);
      if (!target) return;

      if (stockIdx > -1 && row[stockIdx] !== "") {
        const parsedStock = Number(row[stockIdx]);
        if (!Number.isNaN(parsedStock)) {
          target.stock = parsedStock;
        }
      }

      if (soldOutIdx > -1 && row[soldOutIdx] !== "") {
        const rawFlag = row[soldOutIdx].toLowerCase();
        target.soldOut = rawFlag === "true" || rawFlag === "1" || rawFlag === "yes";
      }

      if (typeof target.stock === "number" && target.stock <= 0) {
        target.soldOut = true;
      }

      if (priceInrIdx > -1 && row[priceInrIdx] !== "" && !Number.isNaN(Number(row[priceInrIdx]))) {
        target.priceInr = Number(row[priceInrIdx]);
      }
      if (priceUsdIdx > -1 && row[priceUsdIdx] !== "" && !Number.isNaN(Number(row[priceUsdIdx]))) {
        target.priceUsd = Number(row[priceUsdIdx]);
      }
    });

    applyFilters();
  } catch (err) {
    // Keep local inventory defaults if sheet fetch is offline/unavailable
  }
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

if (watchmakersTrigger) {
  watchmakersTrigger.addEventListener("mouseenter", () => {
    if (window.innerWidth > 860) openMenu();
  });

  watchmakersTrigger.addEventListener("click", () => {
    siteHeader.classList.contains("menu-open") ? closeMenu() : openMenu();
  });
}

document.querySelectorAll(".main-nav .nav-item:not(#watchmakersTrigger), .brand-logo").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (window.innerWidth > 860) closeMenu();
  });
});

document.addEventListener("mouseover", (e) => {
  if (window.innerWidth > 860 && siteHeader.classList.contains("menu-open")) {
    if (!e.target.closest(".site-header")) {
      closeMenu();
    }
  }
});

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    siteHeader.classList.contains("menu-open") ? closeMenu() : openMenu();
  });
}

if (menuBackdrop) {
  menuBackdrop.addEventListener("click", closeMenu);
}

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
  if (!watchGrid) return;
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
    filtered.sort((a, b) => {
      if (a.priceInr === 0 && b.priceInr === 0) return 0;
      if (a.priceInr === 0) return 1;
      if (b.priceInr === 0) return -1;
      return a.priceInr - b.priceInr;
    });
  } else if (sortOrder === "high-to-low") {
    filtered.sort((a, b) => {
      if (a.priceInr === 0 && b.priceInr === 0) return 0;
      if (a.priceInr === 0) return 1;
      if (b.priceInr === 0) return -1;
      return b.priceInr - a.priceInr;
    });
  }

  renderWatches(filtered);
}

function handleImageFallback(imgEl) {
  if (!imgEl || imgEl.dataset.fallbackTried) return;
  imgEl.dataset.fallbackTried = "true";
  const src = imgEl.getAttribute("src") || "";
  if (src.endsWith(".jpeg")) {
    imgEl.src = src.slice(0, -5) + ".jpg";
  } else if (src.endsWith(".jpg")) {
    imgEl.src = src.slice(0, -4) + ".jpeg";
  }
}

function handleCardThumbClick(event, watchId, imageIndex) {
  event.stopPropagation();
  openProductModal(watchId, imageIndex);
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
      const galleryImgs = getWatchGalleryImages(w);
      const coverSrc = galleryImgs[0] || "";
      const effectiveSoldOut = getEffectiveSoldOutState(w);
      const inCart = typeof isWatchInCart === "function" ? isWatchInCart(w.id) : false;
      const bannerLabel = inCart ? "Sold Out &bull; In Cart" : "Sold Out &bull; Archived";
      const soldOutBanner = effectiveSoldOut
        ? `<div class="sold-out-banner" aria-label="Sold out">${bannerLabel}</div>`
        : "";

      const previewStrip =
        galleryImgs.length > 0
          ? `
            <div class="card-thumb-strip" role="group" aria-label="Photo previews for ${w.name}">
              ${galleryImgs
                .map(
                  (src, idx) => `
                  <button
                    type="button"
                    class="card-thumb-btn"
                    aria-label="View photo ${idx + 1} of ${w.name}"
                    title="View photo ${idx + 1}"
                    onclick="handleCardThumbClick(event, ${w.id}, ${idx})"
                  >
                    <img src="${src}" alt="${w.name} preview ${idx + 1}" loading="lazy" onerror="handleImageFallback(this)" />
                  </button>
                `
                )
                .join("")}
            </div>
          `
          : "";

      return `
        <article class="watch-card ${effectiveSoldOut ? "is-sold-out" : ""}" onclick="openProductModal(${w.id}, 0)">
          <span class="card-eyebrow">${w.brand} &bull; ${w.condition}</span>
          <div class="card-media-stage">
            <img src="${coverSrc}" alt="${w.name}" loading="lazy" onerror="handleImageFallback(this)" />
            ${soldOutBanner}
          </div>
          <h3 class="card-title">${w.name}</h3>
          <p class="card-meta">${w.year} &bull; ${w.movement}</p>
          ${previewStrip}
          <p class="card-price">${formatManualDualPrice(w)}</p>
        </article>
      `;
    })
    .join("");
}

// =========================================
// STRAP SELECTOR + ADD TO CART IN MODAL
// =========================================
function renderModalStrapSelector(watch) {
  if (!modalStrapSection || !modalStrapSelect) return;

  const effectiveSoldOut = getEffectiveSoldOutState(watch);
  if (effectiveSoldOut || isSteelWatch(watch)) {
    modalStrapSection.style.display = "none";
    const options =
      typeof getWatchStrapOptions === "function"
        ? getWatchStrapOptions(watch)
        : [{ id: "original-steel", label: watch.bracelet || "Stainless Steel Bracelet", extraInr: 0, extraUsd: 0 }];
    selectedModalStrapId = options[0].id;
    return;
  }

  modalStrapSection.style.display = "flex";
  const options =
    typeof getWatchStrapOptions === "function"
      ? getWatchStrapOptions(watch)
      : [
          { id: "pictured-strap", label: `${watch.bracelet || "Strap"} (As Pictured)`, extraInr: 0, extraUsd: 0 },
          { id: "black-woven-nylon", label: "Black Woven Nylon Strap", extraInr: 0, extraUsd: 0 },
          { id: "black-matte-fabric", label: "Black Matte Canvas / Fabric Strap", extraInr: 0, extraUsd: 0 },
          { id: "black-smooth-leather", label: "Smooth Black Leather Strap", extraInr: 0, extraUsd: 0 },
          { id: "brown-croc-leather", label: "Brown Croc-Embossed Leather Strap", extraInr: 0, extraUsd: 0 }
        ];

  selectedModalStrapId = options[0].id;

  modalStrapSelect.innerHTML = options
    .map((opt) => {
      const extraLabel =
        opt.extraInr > 0 || opt.extraUsd > 0
          ? ` (+₹${Number(opt.extraInr).toLocaleString("en-IN")} • +$${Number(opt.extraUsd).toLocaleString("en-US")})`
          : "";
      return `<option value="${opt.id}">${opt.label}${extraLabel}</option>`;
    })
    .join("");

  updateModalPricingForStrap();
}

function updateModalPricingForStrap() {
  if (!activeWatch || getEffectiveSoldOutState(activeWatch)) return;

  const pricing =
    typeof getUnitPricesWithStrap === "function"
      ? getUnitPricesWithStrap(activeWatch, selectedModalStrapId)
      : {
          unitInr: Number(activeWatch.priceInr) || 0,
          unitUsd: Number(activeWatch.priceUsd) || 0,
          extraInr: 0,
          extraUsd: 0,
          strapLabel: activeWatch.bracelet || "Standard Strap"
        };

  modalPrice.textContent = `₹${pricing.unitInr.toLocaleString("en-IN")} • $${pricing.unitUsd.toLocaleString("en-US")}`;

  if (modalStrapNote) {
    if (pricing.extraInr > 0 || pricing.extraUsd > 0) {
      modalStrapNote.textContent = `Includes +₹${pricing.extraInr.toLocaleString("en-IN")} • +$${pricing.extraUsd.toLocaleString("en-US")} strap upgrade`;
    } else {
      modalStrapNote.textContent = "Default strap as pictured — swap options at ₹0 / $0 extra";
    }
  }
}

function handleModalStrapChange() {
  if (!modalStrapSelect) return;
  selectedModalStrapId = modalStrapSelect.value;
  updateModalPricingForStrap();

  if (modalAddToCartBtn && activeWatch && !getEffectiveSoldOutState(activeWatch)) {
    if (addToCartResetTimer) clearTimeout(addToCartResetTimer);
    modalAddToCartBtn.textContent = "Add to Cart";
    modalAddToCartBtn.classList.remove("is-added");
  }
}

function handleModalPrimaryAction() {
  if (!activeWatch) return;

  if (getEffectiveSoldOutState(activeWatch)) {
    openInquiryModalForProduct(activeWatch.id);
    return;
  }

  if (typeof addWatchToCart === "function") {
    const added = addWatchToCart(activeWatch.id, 1, selectedModalStrapId);
    if (added && modalAddToCartBtn) {
      if (addToCartResetTimer) clearTimeout(addToCartResetTimer);
      modalAddToCartBtn.textContent = "Added to Cart";
      modalAddToCartBtn.classList.add("is-added");

      if (modalViewCartLink) {
        modalViewCartLink.style.display = "inline-block";
      }

      addToCartResetTimer = setTimeout(() => {
        if (modalAddToCartBtn && activeWatch && !getEffectiveSoldOutState(activeWatch)) {
          modalAddToCartBtn.textContent = "Add to Cart";
          modalAddToCartBtn.classList.remove("is-added");
        }
      }, 1800);
    }
  }
}

// =========================================
// FULL PRODUCT DETAIL MODAL + MANUAL ZOOM GALLERY
// =========================================
function syncModalSoldOutBanner(isSoldOut, inCart = false) {
  if (!galleryScrollerWrap) return;
  let banner = galleryScrollerWrap.querySelector(".modal-sold-out-banner");

  if (isSoldOut) {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "sold-out-banner modal-sold-out-banner";
      banner.setAttribute("aria-label", "Sold out");
      galleryScrollerWrap.appendChild(banner);
    }
    banner.textContent = inCart ? "Sold Out • In Cart" : "Sold Out • Archived";
  } else if (banner) {
    banner.remove();
  }
}

function jumpGalleryToIndexImmediate(idx) {
  const imgs = getWatchGalleryImages(activeWatch);
  if (!imgs.length || !modalPhotoTrack) {
    activeImageIndex = 0;
    updateDots();
    return;
  }

  const clamped = Math.max(0, Math.min(idx, imgs.length - 1));
  activeImageIndex = clamped;

  const prevBehavior = modalPhotoTrack.style.scrollBehavior;
  modalPhotoTrack.style.scrollBehavior = "auto";
  modalPhotoTrack.scrollLeft = clamped * modalPhotoTrack.clientWidth;
  updateDots();

  requestAnimationFrame(() => {
    if (!modalPhotoTrack) return;
    modalPhotoTrack.scrollLeft = clamped * modalPhotoTrack.clientWidth;
    modalPhotoTrack.style.scrollBehavior = prevBehavior || "";
    activeImageIndex = clamped;
    updateDots();
  });
}

function openProductModal(watchId, startIndex = 0) {
  const watch = watches.find((w) => Number(w.id) === Number(watchId));
  if (!watch) return;

  if (addToCartResetTimer) clearTimeout(addToCartResetTimer);
  activeWatch = watch;
  const imgs = getWatchGalleryImages(watch);
  activeImageIndex = Math.max(0, Math.min(Number(startIndex) || 0, Math.max(0, imgs.length - 1)));

  const effectiveSoldOut = getEffectiveSoldOutState(watch);
  const inCart = typeof isWatchInCart === "function" ? isWatchInCart(watch.id) : false;

  if (productModalCard) {
    productModalCard.classList.toggle("is-sold-out", effectiveSoldOut);
  }
  syncModalSoldOutBanner(effectiveSoldOut, inCart);

  modalEyebrow.textContent = `${watch.brand} • ${watch.year}`;
  modalTitle.textContent = watch.name;

  if (effectiveSoldOut) {
    const tagText = inCart ? "Sold Out • In Cart" : "Sold Out";
    modalPrice.innerHTML = `<span class="modal-price-strike">${formatManualDualPrice(watch)}</span> <span class="modal-sold-out-tag">${tagText}</span>`;
  } else {
    modalPrice.textContent = formatManualDualPrice(watch);
  }

  if (modalAddToCartBtn) {
    modalAddToCartBtn.classList.remove("is-added");
    if (inCart) {
      modalAddToCartBtn.textContent = "Sold Out (In Cart) — Inquire About Similar";
    } else if (effectiveSoldOut) {
      modalAddToCartBtn.textContent = "Sold Out — Inquire to Source Similar";
    } else {
      modalAddToCartBtn.textContent = "Add to Cart";
    }
  }

  if (modalViewCartLink) {
    const existingCount = typeof getCartTotalCount === "function" ? getCartTotalCount() : 0;
    modalViewCartLink.style.display = existingCount > 0 ? "inline-block" : "none";
  }

  modalDescription.textContent = watch.description;

  renderModalGallery();
  renderModalSpecs();
  renderModalStrapSelector(watch);

  productModalBackdrop.classList.add("open");
  productModalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (productModalCard) productModalCard.scrollTop = 0;

  jumpGalleryToIndexImmediate(activeImageIndex);
}

function closeProductModal() {
  if (addToCartResetTimer) clearTimeout(addToCartResetTimer);
  resetAllSlideZooms();
  jumpGalleryToIndexImmediate(0);
  productModalBackdrop.classList.remove("open");
  productModalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateZoomButtonUI() {
  if (!toggleZoomBtn || !zoomBtnIcon) return;
  toggleZoomBtn.classList.toggle("active", isSlideZoomed);
  toggleZoomBtn.setAttribute("aria-pressed", String(isSlideZoomed));
  toggleZoomBtn.title = isSlideZoomed ? "Zoom out" : "Zoom in";

  zoomBtnIcon.innerHTML = isSlideZoomed
    ? `<circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M8 11h6" />`
    : `<circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />`;
}

function resetAllSlideZooms() {
  isSlideZoomed = false;
  modalPhotoTrack.querySelectorAll(".modal-slide").forEach((slide) => {
    slide.classList.remove("is-zoomed");
    const img = slide.querySelector("img");
    if (img) img.style.transformOrigin = "center center";
  });
  updateZoomButtonUI();
}

function toggleCurrentSlideZoom() {
  const slides = modalPhotoTrack.querySelectorAll(".modal-slide");
  const currentSlide = slides[activeImageIndex];
  if (!currentSlide) return;

  isSlideZoomed = !isSlideZoomed;
  currentSlide.classList.toggle("is-zoomed", isSlideZoomed);

  const img = currentSlide.querySelector("img");
  if (img && !isSlideZoomed) {
    img.style.transformOrigin = "center center";
  }
  updateZoomButtonUI();
}

if (toggleZoomBtn) {
  toggleZoomBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCurrentSlideZoom();
  });
}

function updateSlideOriginFromClientPoint(slide, img, clientX, clientY) {
  const rect = slide.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const xPct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  const yPct = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
  img.style.transformOrigin = `${xPct}% ${yPct}%`;
}

function attachSlideZoomPan() {
  modalPhotoTrack.querySelectorAll(".modal-slide").forEach((slide) => {
    const img = slide.querySelector("img");
    if (!img) return;

    slide.addEventListener("mousemove", (e) => {
      if (!slide.classList.contains("is-zoomed")) return;
      updateSlideOriginFromClientPoint(slide, img, e.clientX, e.clientY);
    });

    slide.addEventListener(
      "touchmove",
      (e) => {
        if (!slide.classList.contains("is-zoomed") || !e.touches.length) return;
        e.preventDefault();
        const touch = e.touches[0];
        updateSlideOriginFromClientPoint(slide, img, touch.clientX, touch.clientY);
      },
      { passive: false }
    );

    slide.addEventListener("click", () => {
      if (slide.classList.contains("is-zoomed")) {
        resetAllSlideZooms();
      }
    });
  });
}

function renderModalGallery() {
  const imgs = getWatchGalleryImages(activeWatch);
  isSlideZoomed = false;
  updateZoomButtonUI();

  modalPhotoTrack.innerHTML = imgs
    .map(
      (src, idx) => `
      <div class="modal-slide">
        <img src="${src}" alt="${activeWatch.name} — view ${idx + 1}" onerror="handleImageFallback(this)" />
      </div>
    `
    )
    .join("");

  attachSlideZoomPan();

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
  const imgs = getWatchGalleryImages(activeWatch);
  if (imgs.length === 0) return;

  resetAllSlideZooms();
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

if (modalPhotoTrack) {
  modalPhotoTrack.addEventListener("scroll", () => {
    if (!modalPhotoTrack.clientWidth) return;
    const newIndex = Math.round(modalPhotoTrack.scrollLeft / modalPhotoTrack.clientWidth);
    if (newIndex !== activeImageIndex) {
      resetAllSlideZooms();
      activeImageIndex = newIndex;
      updateDots();
    }
  });
}

if (prevImgBtn) {
  prevImgBtn.addEventListener("click", () => {
    const total = getWatchGalleryImages(activeWatch).length;
    if (total > 0) {
      scrollToGalleryIndex((activeImageIndex - 1 + total) % total);
    }
  });
}

if (nextImgBtn) {
  nextImgBtn.addEventListener("click", () => {
    const total = getWatchGalleryImages(activeWatch).length;
    if (total > 0) {
      scrollToGalleryIndex((activeImageIndex + 1) % total);
    }
  });
}

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

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeProductModal);
}

if (productModalBackdrop) {
  productModalBackdrop.addEventListener("click", (e) => {
    if (e.target === productModalBackdrop) {
      closeProductModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && productModalBackdrop && productModalBackdrop.classList.contains("open")) {
    closeProductModal();
  }
});

// Initial render + optional inventory sheet sync
applyFilters();
syncInventorySheet();
