// =========================================
// HOUSE OF KĀLA — PRODUCT & GENERAL INQUIRY MODAL
// =========================================
const INQUIRY_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxb9HENQoFBzznWJR2L-en0itaB0-1rfbVHwS23A4rneBd_txRtbex2eK5Bo6oqq-Wn/exec";

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

const clientEmailInput = document.getElementById("clientEmail");
const contactHandleInput = document.getElementById("contactHandle");
const inquiryContactError = document.getElementById("inquiryContactError");

function clearInquiryContactError() {
  if (inquiryContactError) {
    inquiryContactError.textContent = "";
    inquiryContactError.style.display = "none";
  }
}

function showInquiryError(message) {
  if (!inquiryContactError) return;
  inquiryContactError.textContent = message;
  inquiryContactError.style.display = "block";
}

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
  clearInquiryContactError();
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
  clearInquiryContactError();
  inquiryModalBackdrop.classList.remove("open");
  inquiryModalBackdrop.setAttribute("aria-hidden", "true");
  if (!productModalBackdrop || !productModalBackdrop.classList.contains("open")) {
    document.body.style.overflow = "";
  }
}

async function sendInquiryToGoogleSheet(payload) {
  await fetch(INQUIRY_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(payload)
  });
}

if (clientEmailInput) {
  clientEmailInput.addEventListener("input", clearInquiryContactError);
}

if (contactHandleInput) {
  contactHandleInput.addEventListener("input", clearInquiryContactError);
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
  const submitBtn = inquiryForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.textContent : "Submit";

  inquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailVal = clientEmailInput ? clientEmailInput.value.trim() : "";
    const phoneVal = contactHandleInput ? contactHandleInput.value.trim() : "";

    if (!emailVal && !phoneVal) {
      showInquiryError("Please provide either an email address or a Phone / WhatsApp number.");
      if (clientEmailInput) clientEmailInput.focus();
      return;
    }

    clearInquiryContactError();

    const payload = {
      submittedAt: new Date().toISOString(),
      sourceType: inquirySourceType ? inquirySourceType.value : "inquiry",
      productId: inquiryProductId ? inquiryProductId.value : "",
      productBrand: inquiryProductBrand ? inquiryProductBrand.value : "",
      productName: inquiryProductName ? inquiryProductName.value : "",
      productSpecs: inquiryProductSpecs ? inquiryProductSpecs.value : "",
      name: document.getElementById("clientName")?.value.trim() || "",
      email: emailVal,
      preferredContact: document.getElementById("preferredContact")?.value || "",
      phone: phoneVal,
      message: document.getElementById("clientMessage")?.value.trim() || ""
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    try {
      await sendInquiryToGoogleSheet(payload);

      if (typeof window.onHouseOfKalaInquirySubmit === "function") {
        await window.onHouseOfKalaInquirySubmit(payload);
      }

      const channel = payload.preferredContact || "your preferred channel";
      inquiryConfirmationText.textContent =
        payload.sourceType === "product"
          ? `Thank you, ${payload.name}—we've logged your request for ${payload.productName} and will reach out via ${channel}.`
          : `Thank you, ${payload.name}—we've logged your inquiry and will reach out via ${channel}.`;

      inquiryForm.style.display = "none";
      inquiryConfirmation.style.display = "block";
    } catch (err) {
      console.error("House of Kāla inquiry submission error:", err);
      showInquiryError("Something went wrong while sending your inquiry. Please try again.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}

// Auto-open general inquiry modal if navigated from another page with ?contact=inquiry
(function handleUrlInquiryParam() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("contact") === "inquiry") {
    openInquiryModal({ sourceType: "inquiry" });
  }
})();
