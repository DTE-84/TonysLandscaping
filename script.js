document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    navLinks.classList.toggle("active");
  });

  const header = document.querySelector("header");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  document.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        hamburger.classList.remove("is-active");
        navLinks.classList.remove("active");

        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ── Hero tab switcher (background-image tiles) ──
  const sliderContainer = document.querySelector(".ba-container");
  const sliderTabs = document.querySelectorAll(".slider-tab");
  const heroBeforeImg = document.getElementById("beforeImg");
  const heroAfterImg = document.getElementById("afterImg");

  if (sliderContainer) {
    sliderTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        sliderTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        sliderContainer.classList.add("fade-out");
        setTimeout(() => {
          heroBeforeImg.style.backgroundImage = `url('${tab.getAttribute("data-before")}')`;
          heroAfterImg.style.backgroundImage = `url('${tab.getAttribute("data-after")}')`;
          sliderContainer.classList.remove("fade-out");
        }, 300);
      });
    });
  }

  // ── Draggable before/after comparison slider ──
  const dragSlider    = document.getElementById("beforeAfterSlider");
  const afterImageEl  = document.querySelector(".after-image");
  const sliderLine    = document.querySelector(".slider-line");
  const sliderBtn     = document.querySelector(".slider-button");
  const transformTabs = document.querySelectorAll(".transformation-tab");
  const dragBefore    = document.querySelector(".before-image img");
  const dragAfter     = document.querySelector(".after-image img");

  function setSliderPos(value) {
    if (afterImageEl) afterImageEl.style.width = value + "%";
    if (sliderLine)   sliderLine.style.left    = value + "%";
    if (sliderBtn)    sliderBtn.style.left      = value + "%";
  }

  if (dragSlider) {
    dragSlider.addEventListener("input", (e) => setSliderPos(e.target.value));
    setSliderPos(50);
  }

  transformTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      transformTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      if (afterImageEl) afterImageEl.style.opacity = "0";
      setTimeout(() => {
        if (dragBefore) dragBefore.src = tab.dataset.before;
        if (dragAfter)  dragAfter.src  = tab.dataset.after;
        if (dragSlider) dragSlider.value = 50;
        setSliderPos(50);
        if (afterImageEl) afterImageEl.style.opacity = "1";
      }, 220);
    });
  });

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".reveal, .service-card, .about-content")
    .forEach((el) => {
      observer.observe(el);
    });

  // ── Project Scope Estimator Logic ──
  const sizeSlider = document.getElementById("size-slider");
  const sizeDisplay = document.getElementById("size-display");
  const scopeBtns = document.querySelectorAll(".scope-btn");
  const totalDisplay = document.getElementById("totalEstimate");

  const basePrices = {
    "full-design": 5000,
    "partial-design": 2500,
    "hardscaping": 7500
  };

  let selectedScope = null;

  if (sizeSlider && sizeDisplay) {
    sizeSlider.addEventListener("input", (e) => {
      const value = parseFloat(e.target.value).toFixed(1);
      sizeDisplay.innerText = `${value} Acres`;
      updateTotal();
    });
  }

  scopeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      scopeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedScope = btn.getAttribute("data-type");
      updateTotal();
    });
  });

  function updateTotal() {
    if (!totalDisplay) return;
    
    let total = 0;
    const acres = sizeSlider ? parseFloat(sizeSlider.value) : 0.5;

    if (selectedScope && basePrices[selectedScope]) {
      // Logic: Base price + (Base price * 0.5 * (acres - 0.1)) 
      // This is a placeholder logic for estimation
      const base = basePrices[selectedScope];
      total = base + (base * 0.4 * (acres - 0.1));
    }

    totalDisplay.innerText = Math.round(total).toLocaleString();
  }

  // Initialize
  updateTotal();
});

const contactModal = document.getElementById("contactModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close-btn");

if (openModalBtn) {
  openModalBtn.onclick = () => {
    contactModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
}

function closeModal() {
  contactModal.style.display = "none";
  if (!document.querySelector(".lightbox-modal[style*='flex']")) {
    document.body.style.overflow = "";
  }
}

if (closeBtn) closeBtn.onclick = closeModal;

window.onclick = (event) => {
  if (event.target == contactModal) {
    closeModal();
  }
};

function openLightbox(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

const viewer = document.getElementById("fullscreenViewer");
const viewerImg = document.getElementById("viewerImg");

document.querySelectorAll(".gallery-grid img").forEach((img) => {
  img.addEventListener("click", (e) => {
    viewerImg.src = e.target.src;
    viewer.style.display = "flex";
  });
});

function closeViewer() {
  viewer.style.display = "none";
  const openGallery = Array.from(
    document.querySelectorAll(".lightbox-modal"),
  ).find((m) => m.style.display === "flex");
  if (!openGallery) {
    document.body.style.overflow = "";
  }
}

(function () {
  emailjs.init({
    publicKey: "zmPiRmxRkScwdiYFX",
  });
})();

window.onload = function () {
  const form = document.getElementById("contactForm");
  const successOverlay = document.getElementById("successOverlay");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_akgmg6r", "template_nx4fvkb", this).then(
        () => {
          if (successOverlay) {
            successOverlay.style.display = "flex";
          }
          setTimeout(() => {
            if (successOverlay) successOverlay.style.display = "none";
            closeModal();
          }, 3000);
          form.reset();
        },
        (err) => {
          alert("Submission failed. Uplink error.");
        },
      );
    });
  }
};
