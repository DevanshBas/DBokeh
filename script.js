        // Navigation functionality
const navLinks = document.querySelector('.nav-links');
        const pages = document.querySelectorAll('.page');
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinksContainer = document.querySelector('.nav-links');

        // Page navigation
        function showPage(pageId) {
            pages.forEach(page => page.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            
            document.getElementById(pageId).classList.add('active');
            document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
            
            // Close mobile menu
            navLinksContainer.classList.remove('active');
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                showPage(pageId);
            });
        });

        // CTA button
        document.querySelector('.cta-button').addEventListener('click', (e) => {
            e.preventDefault();
            showPage('portfolio');
        });

        // Mobile menu toggle
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        // Hero slideshow
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 5000);

        // Portfolio lightbox
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = document.querySelector('.lightbox-close');

        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const imageSrc = item.getAttribute('data-image');
                lightboxImg.src = imageSrc;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // Contact form
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            e.target.reset();
        });

        // Smooth animations on page load
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('fade-in');
        });