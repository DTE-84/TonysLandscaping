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

  const sliderContainer = document.querySelector(".ba-container");
  const sliderTabs = document.querySelectorAll(".slider-tab");
  const beforeImg = document.getElementById("beforeImg");
  const afterImg = document.getElementById("afterImg");

  sliderTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const before = tab.getAttribute("data-before");
      const after = tab.getAttribute("data-after");

      sliderTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      sliderContainer.classList.add("fade-out");

      setTimeout(() => {
        beforeImg.style.backgroundImage = `url('${before}')`;
        afterImg.style.backgroundImage = `url('${after}')`;
        sliderContainer.classList.remove("fade-out");
      }, 300);
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

  const calcItems = document.querySelectorAll(".calc-item");
  const totalDisplay = document.getElementById("totalEstimate");

  calcItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
      updateTotal();
    });
  });

  function updateTotal() {
    let total = 0;
    document.querySelectorAll(".calc-item.active").forEach((activeItem) => {
      total += parseInt(activeItem.getAttribute("data-price"));
    });
    totalDisplay.innerText = total.toLocaleString();
  }
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
