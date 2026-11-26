// =========================================
// HOUSE OF KĀLA — PRODUCT & GENERAL INQUIRY MODAL
// =========================================
const inquiryModalBackdrop = document.getElementById("inquiryModalBackdrop");
const closeInquiryModalBtn = document.getElementById("closeInquiryModalBtn");
const inquiryForm = document.getElementById("inquiryForm");
const inquiryConfirmation = document.getElementById("inquiryConfirmation");
const inquiryConfirmationText = document.getElementById("inquiryConfirmationText");
const inquiryDoneBtn = document.getElementById("inquiryDoneBtn");

const inquiryEyebrow = document.getElementById("inquiryEyebrow");
const inquiryModalTitle = document.getElementById("inquiryModalTitle");
const inquirySubtitle = document.getElementById("inquirySubtitle");

const inquirySourceType = document.getElementById("inquirySourceType");
const inquiryProductId = document.getElementById("inquiryProductId");
const inquiryProductBrand = document.getElementById("inquiryProductBrand");
const inquiryProductName = document.getElementById("inquiryProductName");
const inquiryProductSpecs = document.getElementById("inquiryProductSpecs");

function buildWatchSpecSummary(watch) {
  const priceSummary =
    typeof formatManualDualPrice === "function"
      ? formatManualDualPrice(watch)
      : `₹${watch.priceInr} • $${watch.priceUsd}`;

  return [
    `Brand: ${watch.brand}`,
    `Model: ${watch.name}`,
    `Era: ${watch.year}`,
    `Movement: ${watch.movement}`,
    `Caliber: ${watch.caliber}`,
    `Case: ${watch.caseSize}`,
    `Strap: ${watch.bracelet}`,
    `Grade: ${watch.condition}`,
    `Price: ${priceSummary}`
  ].join(" | ");
}

function openInquiryModalForProduct(watchId) {
  if (typeof watches === "undefined") return;
  const watch = watches.find((w) => w.id === watchId);
  if (!watch) return;

  openInquiryModal({
    sourceType: "product",
    productId: watch.id,
    productBrand: watch.brand,
    productName: watch.name,
    productSpecs: buildWatchSpecSummary(watch)
  });
}

function openInquiryModal(options = {}) {
  if (!inquiryModalBackdrop) return;

  const isProduct = options.sourceType === "product" && options.productName;

  inquiryForm.reset();
  inquiryForm.style.display = "flex";
  inquiryConfirmation.style.display = "none";

  if (isProduct) {
    inquirySourceType.value = "product";
    inquiryProductId.value = options.productId ?? "";
    inquiryProductBrand.value = options.productBrand ?? "";
    inquiryProductName.value = options.productName ?? "";
    inquiryProductSpecs.value = options.productSpecs ?? "";

    inquiryEyebrow.textContent = `${options.productBrand || "TIMEPIECE"} • PRODUCT INQUIRY`;
    inquiryModalTitle.textContent = options.productName;
    inquirySubtitle.textContent = "Leave your details and we will reach out regarding this timepiece.";
  } else {
    inquirySourceType.value = "inquiry";
    inquiryProductId.value = "";
    inquiryProductBrand.value = "";
    inquiryProductName.value = "";
    inquiryProductSpecs.value = "";

    inquiryEyebrow.textContent = "HOUSE OF KĀLA • INQUIRY";
    inquiryModalTitle.textContent = "Contact Us";
    inquirySubtitle.textContent = "Share your details and preferred way to connect.";
  }

  inquiryModalBackdrop.classList.add("open");
  inquiryModalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeInquiryModal() {
  if (!inquiryModalBackdrop) return;
  inquiryModalBackdrop.classList.remove("open");
  inquiryModalBackdrop.setAttribute("aria-hidden", "true");
  if (!productModalBackdrop || !productModalBackdrop.classList.contains("open")) {
    document.body.style.overflow = "";
  }
}

if (closeInquiryModalBtn) {
  closeInquiryModalBtn.addEventListener("click", closeInquiryModal);
}

if (inquiryDoneBtn) {
  inquiryDoneBtn.addEventListener("click", closeInquiryModal);
}

if (inquiryModalBackdrop) {
  inquiryModalBackdrop.addEventListener("click", (e) => {
    if (e.target === inquiryModalBackdrop) {
      closeInquiryModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && inquiryModalBackdrop && inquiryModalBackdrop.classList.contains("open")) {
    closeInquiryModal();
  }
});

if (inquiryForm) {
  inquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      submittedAt: new Date().toISOString(),
      sourceType: inquirySourceType.value, // "product" vs "inquiry"
      productId: inquiryProductId.value,
      productBrand: inquiryProductBrand.value,
      productName: inquiryProductName.value,
      productSpecs: inquiryProductSpecs.value,
      name: document.getElementById("clientName").value.trim(),
      email: document.getElementById("clientEmail").value.trim(),
      preferredContact: document.getElementById("preferredContact").value,
      phone: document.getElementById("contactHandle").value.trim(),
      message: document.getElementById("clientMessage").value.trim()
    };

    if (typeof window.onHouseOfKalaInquirySubmit === "function") {
      await window.onHouseOfKalaInquirySubmit(payload);
    }

    const channel = payload.preferredContact;
    inquiryConfirmationText.textContent =
      payload.sourceType === "product"
        ? `Thank you, ${payload.name}—we've logged your request for ${payload.productName} and will reach out via ${channel}.`
        : `Thank you, ${payload.name}—we've logged your inquiry and will reach out via ${channel}.`;

    inquiryForm.style.display = "none";
    inquiryConfirmation.style.display = "block";
  });
}

// Auto-open general inquiry modal if navigated from another page with ?contact=inquiry
(function handleUrlInquiryParam() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("contact") === "inquiry") {
    openInquiryModal({ sourceType: "inquiry" });
  }
})();
