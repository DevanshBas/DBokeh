// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleNav() {
  navLinks.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
}

hamburger.addEventListener('click', toggleNav);
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleNav();
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Portfolio Modal
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = modal.querySelector('.close');
const portfolioItems = document.querySelectorAll('.portfolio-item');
let lastFocusedElement = null;

function openModal(imageSrc, imageAlt) {
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  modal.setAttribute('aria-hidden', 'false');
  lastFocusedElement = document.activeElement;
  closeBtn.focus();
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
  modal.setAttribute('aria-hidden', 'true');
  if (lastFocusedElement) lastFocusedElement.focus();
}

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const imageSrc = item.getAttribute('data-image');
    const imageAlt = item.querySelector('img').alt;
    openModal(imageSrc, imageAlt);
  });
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const imageSrc = item.getAttribute('data-image');
      const imageAlt = item.querySelector('img').alt;
      openModal(imageSrc, imageAlt);
    }
  });
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', item.querySelector('.caption').textContent);
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

window.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === 'Escape') closeModal();
    // Trap focus in modal
    if (e.key === 'Tab') {
      const focusable = [closeBtn, modalImage];
      const idx = focusable.indexOf(document.activeElement);
      if (e.shiftKey) {
        if (idx === 0) {
          e.preventDefault();
          focusable[focusable.length - 1].focus();
        }
      } else {
        if (idx === focusable.length - 1) {
          e.preventDefault();
          focusable[0].focus();
        }
      }
    }
  }
});

// Lazy Loading for Images (Intersection Observer)
function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback: load all images
    images.forEach(img => {
      if (img.dataset.src) img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
}
lazyLoadImages();

// Add entrance animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.portfolio-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(item);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(255,255,255,0.98)';
    header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
  } else {
    header.style.background = '';
    header.style.boxShadow = '';
  }
});
