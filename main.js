// Menu responsive (mobile)
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav ul');
    const header = document.querySelector('header');
    // Ajout d'un bouton burger pour mobile
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = '<span></span><span></span><span></span>';
    header.querySelector('.container').appendChild(burger);

    burger.addEventListener('click', function () {
        nav.classList.toggle('open');
        burger.classList.toggle('open');
    });

    // Carrousel du bar
    const carousel = document.querySelector('.bar-carousel');
    if (carousel) {
        const track = carousel.querySelector('.bar-carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.bar-slide'));
        const prevBtn = carousel.querySelector('.bar-carousel-control.prev');
        const nextBtn = carousel.querySelector('.bar-carousel-control.next');
        const dots = Array.from(carousel.querySelectorAll('.bar-carousel-dots .dot'));
        let currentIndex = 0;

        function updateCarousel(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentIndex);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        prevBtn.addEventListener('click', function () {
            updateCarousel(currentIndex - 1);
        });

        nextBtn.addEventListener('click', function () {
            updateCarousel(currentIndex + 1);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', function () {
                updateCarousel(i);
            });
        });

        // Auto-play léger
        setInterval(function () {
            updateCarousel(currentIndex + 1);
        }, 8000);

        // Lightbox
        const wrappers = Array.from(carousel.querySelectorAll('.bar-img-wrapper'));
        const lightbox = document.querySelector('.bar-lightbox');
        const lightboxImg = lightbox ? lightbox.querySelector('.bar-lightbox-img') : null;
        const lightboxClose = lightbox ? lightbox.querySelector('.bar-lightbox-close') : null;
        const lightboxBackdrop = lightbox ? lightbox.querySelector('.bar-lightbox-backdrop') : null;

        function openLightbox(src) {
            if (!lightbox || !lightboxImg) return;
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            if (!lightbox || !lightboxImg) return;
            lightbox.classList.remove('active');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        }

        wrappers.forEach(btn => {
            btn.addEventListener('click', function () {
                const src = btn.getAttribute('data-large');
                if (src) openLightbox(src);
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        if (lightboxBackdrop) {
            lightboxBackdrop.addEventListener('click', closeLightbox);
        }

        window.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});

// Animation légère sur le scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 30) {
        header.style.background = 'rgba(26, 31, 43, 0.98)';
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    } else {
        header.style.background = 'rgba(26, 31, 43, 0.95)';
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    }
});

// Soumission du formulaire (factice)
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous répondrons rapidement.');
        form.reset();
    });
});
