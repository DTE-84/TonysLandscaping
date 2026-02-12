// --- Mobile Hamburger Menu ---
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navLinks = document.querySelector(".nav-links");
  
  // --- Header Scroll Logic ---
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial check

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      hamburgerBtn.classList.toggle("open");
      document.body.style.overflow = navLinks.classList.contains("nav-active") ? "hidden" : "auto";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active");
        hamburgerBtn.classList.remove("open");
        document.body.style.overflow = "auto";
      });
    });
  }

  // --- Before/After Slider Logic ---
  const slider = document.getElementById("beforeAfterSlider");
  const afterImage = document.querySelector(".after-image");
  const sliderLine = document.querySelector(".slider-line");
  const sliderButton = document.querySelector(".slider-button");
  const beforeImg = document.getElementById("beforeImg");
  const afterImg = document.getElementById("afterImg");
  const tabs = document.querySelectorAll(".transformation-tab");

  if (slider) {
    slider.addEventListener("input", (e) => {
      const value = e.target.value;
      afterImage.style.width = `${value}%`;
      sliderLine.style.left = `${value}%`;
      sliderButton.style.left = `${value}%`;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Update Active Tab
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Update Images
      const beforeSrc = tab.dataset.before;
      const afterSrc = tab.dataset.after;

      // Smooth transition effect
      afterImage.style.opacity = "0";
      setTimeout(() => {
        beforeImg.src = beforeSrc;
        afterImg.src = afterSrc;
        afterImage.style.opacity = "1";
      }, 200);
    });
  });

  // --- Scroll Reveal Animation ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });
});

// --- Contact Modal Functionality ---
const modal = document.getElementById("contactModal");
const contactBtnHeader = document.getElementById("contactBtnHeader");
const closeBtn = document.querySelector(".close-btn");

const openModal = () => (modal.style.display = "flex");
const closeModal = () => (modal.style.display = "none");

if (modal && contactBtnHeader && closeBtn) {
  contactBtnHeader.addEventListener("click", openModal);

  const contactBtnFooter = document.getElementById("contactBtnFooter");
  if (contactBtnFooter) {
    contactBtnFooter.addEventListener("click", openModal);
  }
  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

const serviceCardTriggers = document.querySelectorAll(".service-card-trigger");
const lightboxCloseBtns = document.querySelectorAll(".lightbox-close-btn");
const lightboxGalleries = document.querySelectorAll(".lightbox-gallery");

serviceCardTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = trigger.dataset.galleryTarget;
    const targetLightbox = document.getElementById(targetId);
    if (targetLightbox) {
      targetLightbox.style.display = "flex";
    }
  });
});

lightboxCloseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".lightbox-gallery").style.display = "none";
  });
});

lightboxGalleries.forEach((gallery) => {
  gallery.addEventListener("click", (event) => {
    if (event.target === gallery) {
      gallery.style.display = "none";
    }
  });
});

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  const form = document.getElementById("contactForm"); // Match your HTML ID exactly

  loading.classList.add("modal__overlay--visible");

  emailjs
    .sendForm("service_9kmr7ne", "template_cdr3twz", event.target)
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
      form.reset();
      setTimeout(() => {
        success.classList.remove("modal__overlay--visible");
        closeModal(); // Use your existing closeModal function
      }, 3000);
    })
    .catch((err) => {
      loading.classList.remove("modal__overlay--visible");
      console.error(err);
      alert("Submission failed. Please email tonylandscapingllc@outlook.com directly.");
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
