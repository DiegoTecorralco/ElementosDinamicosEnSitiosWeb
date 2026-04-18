// ==================== SCROLL ANIMATION (MODERNA - UNO POR UNO) ====================
// Selecciona TODOS los elementos que quieres que aparezcan con animación
const animatedElements = document.querySelectorAll(
    '.hero-text, .hero-img, .service-card, .especialistas-card, .panel, .recuperacion-seccion, .servicios,.contenedor-servicios .servicio> div'
);

// Función para verificar si un elemento está en la pantalla
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight - 100 && rect.bottom >= 100;
};

// Función para animar los elementos visibles
const animateOnScroll = () => {
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
            element.classList.remove('hidden-element');
        } else {
            element.classList.remove('visible');
            element.classList.add('hidden-element');
        }
    });
};

// Escucha el evento scroll para animar
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ==================== PANEL ====================
const btnPanel = document.getElementById('btn-panel');
const contenidoPanel = document.getElementById('contenido-panel');

if (btnPanel) {
    btnPanel.addEventListener('click', () => {
        contenidoPanel.classList.toggle('hidden-panel');
        btnPanel.textContent = contenidoPanel.classList.contains('hidden-panel')
            ? 'Mostrar Panel'
            : 'Ocultar Panel';
    });
}

// ==================== TARJETAS DE ESPECIALISTAS ====================
const cards = document.querySelectorAll('.especialistas-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.backgroundColor = 'rgb(244, 244, 244)';
        card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.backgroundColor = '';
        card.style.transform = 'scale(1)';
    });
});

// ==================== CARRUSEL DE ESPECIALISTAS ====================
const carouselImages = [
    {
        img: "./assets/especialista1.png",
        nombre: "Dra. Elena Martínez",
        especialidad: "Directora Clínica & Osteopatía"
    },
    {
        img: "./assets/especialista2.png",
        nombre: "Dr. Carlos Ruíz",
        especialidad: "Fisioterapia Deportiva"
    },
    {
        img: "./assets/especialista3.png",
        nombre: "Dra. Sofía Alarcón",
        especialidad: "Neurología Funcional"
    },
    {
        img: "./assets/especialista4.png",
        nombre: "Dr. Miguel Torres",
        especialidad: "Rehabilitación Postquirúrgica"
    },
    {
        img: "./assets/especialista1.png",
        nombre: "Lic. Ana Gómez",
        especialidad: "Terapia Manual Avanzada"
    }
];

let currentIndex = 0;
let autoInterval = null;
let isAutoPlaying = true;
const AUTO_DELAY = 3000;

const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsContainer = document.getElementById('carouselDots');
const toggleAutoBtn = document.getElementById('toggleAutoBtn'); // ✅ Ahora SÍ está declarado

const getSlideWidth = () => {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 30;
    return slideWidth + gap;
};

const updateCarousel = () => {
    if (!track) return;
    const slideWidth = getSlideWidth();
    if (slideWidth === 0) return;
    const desplazamiento = currentIndex * slideWidth;
    track.style.transform = `translateX(-${desplazamiento}px)`;
    updateDots();
};

const createDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < carouselImages.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
};

const updateDots = () => {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
};

const nextSlide = () => {
    if (currentIndex >= carouselImages.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    updateCarousel();
};

const prevSlide = () => {
    if (currentIndex <= 0) {
        currentIndex = carouselImages.length - 1;
    } else {
        currentIndex--;
    }
    updateCarousel();
};

const goToSlide = (index) => {
    currentIndex = index;
    updateCarousel();
};

const startAutoPlay = () => {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => nextSlide(), AUTO_DELAY);
    isAutoPlaying = true;
    if (toggleAutoBtn) toggleAutoBtn.textContent = '⏸ Pausar';
};

const toggleAutoPlay = () => {
    if (isAutoPlaying) {
        clearInterval(autoInterval);
        autoInterval = null;
        isAutoPlaying = false;
        if (toggleAutoBtn) toggleAutoBtn.textContent = '▶ Reanudar';
    } else {
        startAutoPlay();
    }
};

const resetAutoPlay = () => {
    if (isAutoPlaying) startAutoPlay();
};

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
}

if (toggleAutoBtn) {  // ✅ Ahora toggleAutoBtn existe
    toggleAutoBtn.addEventListener('click', toggleAutoPlay);
}

const initCarousel = () => {
    createDots();
    updateCarousel();
    startAutoPlay();
};

if (track && carouselImages.length > 0) {
    initCarousel();
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (track) updateCarousel();
    }, 250);
});