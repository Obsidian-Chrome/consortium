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
