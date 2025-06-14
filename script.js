// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleNav() {
  const isExpanded = navLinks.classList.toggle('active') ? 'true' : 'false';
  hamburger.setAttribute('aria-expanded', isExpanded);
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
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Hero Rotating/Featured Shot
const heroImages = [
  {
    src: "images/DSC_0003.jpg",
    title: "Sunrise Peaks",
    location: "Banff, Canada",
    quote: "A cold morning in the Rockies."
  },
  {
    src: "images/DSC_0021.jpg",
    title: "City Lights",
    location: "Toronto, ON",
    quote: "Downtown at night."
  },
  {
    src: "images/DSC_0025.jpg",
    title: "Portrait Example",
    location: "Calgary, AB",
    quote: "A candid portrait."
  },
  {
    src: "images/DSC_0058.jpg",
    title: "Forest Trail",
    location: "Whistler, BC",
    quote: "A misty forest trail."
  },
  {
    src: "images/DSC_0081.jpg",
    title: "Street Mood",
    location: "New York, NY",
    quote: "A rainy street scene."
  },
  {
    src: "images/DSC_0084.jpg",
    title: "Evening Smile",
    location: "Vancouver, BC",
    quote: "A smile at dusk."
  }
];
let heroIndex = 0;
const heroImg = document.getElementById('hero-image');
const heroTitle = document.getElementById('hero-title');
const heroMeta = document.getElementById('hero-meta');
function setHero(idx) {
  const h = heroImages[idx];
  heroImg.src = h.src;
  heroImg.alt = h.title + " - " + h.quote;
  heroTitle.textContent = h.title;
  heroMeta.innerHTML = `<span class="hero-location">${h.location}</span><span class="hero-quote">${h.quote}</span>`;
}
document.querySelector('.hero-arrow-left').onclick = () => {
  heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
  setHero(heroIndex);
};
document.querySelector('.hero-arrow-right').onclick = () => {
  heroIndex = (heroIndex + 1) % heroImages.length;
  setHero(heroIndex);
};
setHero(heroIndex);

// Portfolio Modal
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = modal.querySelector('.close');
const modalTitle = document.getElementById('modal-title');
const modalLocation = document.getElementById('modal-location');
const modalTags = document.getElementById('modal-tags');
const modalStory = document.getElementById('modal-story');
const modalShare = document.getElementById('modal-share');
const modalDownload = document.getElementById('modal-download');
const modalArrowLeft = document.querySelector('.modal-arrow-left');
const modalArrowRight = document.querySelector('.modal-arrow-right');
// Add modal alt/desc elements
let modalAlt = document.getElementById('modal-alt');
let modalDesc = document.getElementById('modal-desc');
if (!modalAlt) {
  modalAlt = document.createElement('div');
  modalAlt.id = 'modal-alt';
  modalImage.parentNode.insertBefore(modalAlt, modalImage.nextSibling);
}
if (!modalDesc) {
  modalDesc = document.createElement('div');
  modalDesc.id = 'modal-desc';
  modalAlt.parentNode.insertBefore(modalDesc, modalAlt.nextSibling);
}
const masonryCards = Array.from(document.querySelectorAll('.portfolio-masonry-grid .photo-card'));
let currentModalIdx = 0;

function openModalByIdx(idx) {
  const item = masonryCards[idx];
  if (!item) return;
  const img = item.querySelector('img');
  modalImage.src = img.src;
  modalImage.alt = item.dataset.alt || img.alt || '';
  modalTitle.textContent = item.dataset.title || '';
  modalLocation.textContent = item.dataset.location || '';
  modalTags.textContent = (item.dataset.tags || '').split(',').map(t => t ? `#${t.trim()}` : '').join(' ');
  modalStory.textContent = item.dataset.caption || '';
  modalAlt.textContent = item.dataset.alt ? `Alt: ${item.dataset.alt}` : '';
  modalDesc.textContent = item.dataset.desc ? item.dataset.desc : '';
  modalDownload.href = img.src;
  currentModalIdx = idx;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  modal.setAttribute('aria-hidden', 'false');
  closeBtn.focus();
}
masonryCards.forEach((item, idx) => {
  item.addEventListener('click', () => openModalByIdx(idx));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModalByIdx(idx);
    }
  });
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', 'View ' + (item.dataset.title || 'photo'));
});

// Modal link button (copy image URL)
document.querySelectorAll('.link-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const url = btn.getAttribute('data-img-link');
    if (url) {
      navigator.clipboard.writeText(window.location.origin + '/' + url.replace(/^\//, ''));
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1200);
    }
  });
});

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
  modal.setAttribute('aria-hidden', 'true');
}
closeBtn.addEventListener('click', closeModal);
modalArrowLeft.addEventListener('click', () => openModalByIdx((currentModalIdx - 1 + masonryCards.length) % masonryCards.length));
modalArrowRight.addEventListener('click', () => openModalByIdx((currentModalIdx + 1) % masonryCards.length));
window.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') modalArrowLeft.click();
    if (e.key === 'ArrowRight') modalArrowRight.click();
  }
});
modalShare.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: modalTitle.textContent,
      url: modalImage.src
    });
  } else {
    navigator.clipboard.writeText(modalImage.src);
    modalShare.textContent = "✅";
    setTimeout(() => { modalShare.textContent = "🔗"; }, 1200);
  }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.querySelector('.dark-mode-icon');

// Only initialize dark mode if toggle exists
function initDarkMode() {
  if (!darkModeToggle || !darkModeIcon) return;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedMode = localStorage.getItem('darkMode');
  
  if (savedMode === 'enabled' || (savedMode === null && prefersDark)) {
    document.body.classList.add('dark-mode');
    darkModeIcon.textContent = '☀️';
    darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    darkModeIcon.textContent = '🌙';
    darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  
  // Update icon and label
  darkModeIcon.textContent = isDarkMode ? '☀️' : '🌙';
  darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
  
  // Save preference (Note: This uses localStorage which won't work in Claude artifacts)
  // For use outside of artifacts, uncomment the line below:
  // localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Initialize and add event listener
initDarkMode();
if (darkModeToggle && darkModeIcon) {
  darkModeToggle.addEventListener('click', toggleDarkMode);

  // Add keyboard support
  darkModeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDarkMode();
    }
  });
}

// Lazy Loading for Images (Intersection Observer)
function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Only swap src if using data-src (not needed if using srcset)
          if (img.dataset && img.dataset.src) img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' }); // Start loading before image is in viewport
    images.forEach(img => imageObserver.observe(img));
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
let lastScrollY = 0;
let ticking = false;
function updateHeader() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(255,255,255,0.98)';
    header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    if (document.body.classList.contains('dark-mode')) {
      header.style.background = 'rgba(18,18,18,0.98)';
    }
  } else {
    header.style.background = '';
    header.style.boxShadow = '';
  }
  ticking = false;
}
window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
});

// Portfolio Category Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItemsAll = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItemsAll.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});


// Contact Form Submission (client-side simulation)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
 e.preventDefault();

 formStatus.textContent = 'Sending...';
 formStatus.style.color = '#FFAE00'; // Use accent color for status

 // Simulate sending (replace with actual fetch() to backend later)
 setTimeout(() => {
 formStatus.textContent = 'Thank you for your message! I\'ll get back to you shortly.';
 formStatus.style.color = '#6C92F1'; // Use secondary accent color for success
 contactForm.reset();

 // Clear status message after a few seconds
 setTimeout(() => {
 formStatus.textContent = '';
 }, 5000);
  }, 2000); // Simulate a 2-second delay
});

// Bokeh Floating Lights Background
(function bokehBackground() {
  const canvas = document.getElementById('bokeh-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const colors = ['#ffffff', '#ffcc00', '#ff6699', '#66ccff'];
  const numParticles = 30;
  const maxParticleSize = 40;
  const minParticleSize = 10;
  const maxSpeed = 3;
  const minSpeed = 0.5;
  const opacity = 0.7;
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function createParticle() {
    const size = Math.random() * (maxParticleSize - minParticleSize) + minParticleSize;
    const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: size,
      speed: speed,
      direction: Math.random() * 2 * Math.PI,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: opacity
    });
  }
  function updateParticle(p) {
    p.x += Math.cos(p.direction) * p.speed;
    p.y += Math.sin(p.direction) * p.speed;
    if (p.x > canvas.width + p.size) p.x = -p.size;
    else if (p.x < -p.size) p.x = canvas.width + p.size;
    if (p.y > canvas.height + p.size) p.y = -p.size;
    else if (p.y < -p.size) p.y = canvas.height + p.size;
  }
  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fill();
  }
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function animate() {
    clearCanvas();
    particles.forEach(updateParticle);
    particles.forEach(drawParticle);
    requestAnimationFrame(animate);
  }
  window.addEventListener('resize', () => {
    resizeCanvas();
    clearCanvas();
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      createParticle();
    }
    animate();
  });
  for (let i = 0; i < numParticles; i++) {
    createParticle();
  }
  resizeCanvas();
  animate();
})();

// Parallax effect for hero image
const heroSection = document.querySelector('.hero');
const parallaxSpeed = 0.5;
function parallaxHero() {
  const scrolled = window.scrollY;
  heroSection.querySelector('img').style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
}
window.addEventListener('scroll', parallaxHero);

// Portfolio Tag Pill Filtering (works for both top filters and photo tags)
const tagPills = document.querySelectorAll('.tag-pill');
tagPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const filter = pill.dataset.filter;
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === filter) btn.classList.add('active');
    });
    portfolioItemsAll.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Loading Overlay: Always hide after 1.5s (no matter what)
window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  overlay.classList.remove('hidden'); // Ensure it's visible at first
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 1500);
});

// Simple AOS (Animate On Scroll) for photo cards
function aosInit() {
  const aosEls = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  aosEls.forEach(el => observer.observe(el));
}
aosInit();

// Modal swipe support for mobile
let touchStartX = null;
modal.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
});
modal.addEventListener('touchend', function(e) {
  if (touchStartX !== null && e.changedTouches.length === 1) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) {
        modalArrowLeft.click();
      } else {
        modalArrowRight.click();
      }
    }
    touchStartX = null;
  }
});