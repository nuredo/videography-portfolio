// Simple interactivity: menu toggle, smooth scroll, contact form alert, video modal

document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const viewWorkBtn = document.getElementById('view-work');
  const portfolio = document.getElementById('portfolio');
  const contactForm = document.getElementById('contact-form');
  const yearSpan = document.getElementById('year');

  // Video modal elements
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');

  // Set current year in footer
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile menu toggle
  menuToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Smooth scroll to portfolio when "View My Work" clicked
  viewWorkBtn.addEventListener('click', function () {
    if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // If nav was open on mobile, close it
    if (mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Contact form submit: show a simple alert and clear the form
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // do not actually send anywhere
    const name = document.getElementById('name').value.trim();
    // Simple alert to confirm submission
    alert('Thanks, ' + (name || 'there') + '! Your message has been submitted.');
    contactForm.reset();
  });

  // Open video modal when any "Watch Video" button is clicked
  document.querySelectorAll('.watch-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const src = btn.getAttribute('data-video');
      if (!src) return;
      modalVideo.src = src;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      // Play when metadata loaded
      modalVideo.play().catch(() => { /* autoplay may be blocked; user can press play */ });
    });
  });

  // Close modal helper
  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    // Pause and remove source to stop downloading
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
});
