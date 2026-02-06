// --- Mobile Hamburger Menu ---
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navLinks = document.querySelector(".nav-links");
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      hamburgerBtn.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active");
        hamburgerBtn.classList.remove("open");
      });
    });
  }
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
      alert(
        "Submission failed. Please email tonylandscapingllc@outlook.com directly.",
      );
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
