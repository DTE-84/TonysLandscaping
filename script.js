

    // --- Mobile Hamburger Menu ---
     document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active'); // Toggles visibility of the nav links
            hamburgerBtn.classList.toggle('open');   // Toggles animation for the hamburger icon
        });

           // Optional: Close the mobile menu when a link inside it is clicked
           navLinks.querySelectorAll('a').forEach(link => {
             link.addEventListener('click', () => {
                   navLinks.classList.remove('nav-active');
                   hamburgerBtn.classList.remove('open');
             });
         });     }
 });

    // --- Contact Modal Functionality ---
    const modal = document.getElementById('contactModal');
    const contactBtnHeader = document.getElementById('contactBtnHeader'); // Updated ID
    const closeBtn = document.querySelector('.close-btn');

    const openModal = () => modal.style.display = 'flex';
    const closeModal = () => modal.style.display = 'none';

    if (modal && contactBtnHeader && closeBtn) { // Use contactBtnHeader here
        contactBtnHeader.addEventListener('click', openModal);
        // Add event listener for the footer contact button
        const contactBtnFooter = document.getElementById('contactBtnFooter');
        if (contactBtnFooter) {
            contactBtnFooter.addEventListener('click', openModal);
        }
        closeBtn.addEventListener('click', closeModal);
        // Close modal if user clicks on the background overlay
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // --- Service Card Lightbox Gallery Functionality ---
    const serviceCardTriggers = document.querySelectorAll('.service-card-trigger');
    const lightboxCloseBtns = document.querySelectorAll('.lightbox-close-btn');
    const lightboxGalleries = document.querySelectorAll('.lightbox-gallery');

    serviceCardTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const targetId = trigger.dataset.galleryTarget;
            const targetLightbox = document.getElementById(targetId);
            if (targetLightbox) {
                targetLightbox.style.display = 'flex'; // Show the lightbox
            }
        });
    });

    lightboxCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.lightbox-gallery').style.display = 'none'; // Hide the parent lightbox
        });
    });

    // Close lightbox if user clicks on the background overlay
    lightboxGalleries.forEach(gallery => {
        gallery.addEventListener('click', (event) => {
            if (event.target === gallery) { // Check if the click was on the overlay itself
                gallery.style.display = 'none';
            }
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const contactInfo = document.getElementById('contactInfo').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !contactInfo || !message) {
                alert('Please fill out all fields.');
                return;
            }

            const recipientEmail = 'contact@tonyslandscape.com'; // ** IMPORTANT: Change this to your company's email **
            const subject = `New Landscape Inquiry from ${name}`;
            const body = `Name: ${name}\nContact: ${contactInfo}\n\nMessage:\n${message}`;

            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open user's default email client
            window.location.href = mailtoLink;

            closeModal();
            this.reset();
        });
    }
    
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

