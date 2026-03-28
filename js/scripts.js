// ==================== SCROLL ANIMATION ====================
// Selecciona todas las secciones (<section>) de la página
const sections = document.querySelectorAll('section');
// Selecciona el botón para ocultar el panel
const btnPanel = document.getElementById('btn-panel');
// Selecciona el panel que se va a ocultar
const contenidoPanel = document.getElementById('contenido-panel');
// Selecciona todas las tarjetas de especialistas originales (si existen)
const cards = document.querySelectorAll('.especialistas-card');

// Evento de Scroll - Escucha cuando haces scroll (bajas o subes la página)
window.addEventListener('scroll', () => {
    sections.forEach(section => { // Recorre cada sección una por una
        const rect = section.getBoundingClientRect(); // Obtiene la posición de la sección en la pantalla
        // rect.top → qué tan lejos está del borde superior
        // rect.bottom → dónde termina
        if (rect.top < window.innerHeight && rect.bottom > 0) { // si la sección está dentro de la pantalla (visible)
            section.classList.add('visible'); // agrega clase visible
            section.classList.remove('hidden');  // quita la clase hidden
        }
    });
});

// Evento para ocultar el panel
btnPanel.addEventListener('click', () => {
    contenidoPanel.classList.toggle('hidden-panel'); // Agrega o quita la clase hidden del panel cada vez que se hace clic en el botón
    btnPanel.textContent = contenidoPanel.classList.contains('hidden-panel') // Cambia el texto del botón dependiendo del estado
    ? 'Mostrar Panel' // Si el contenido ESTÁ oculto → dice "Mostrar Panel"
    : 'Ocultar Panel'; // Si el contenido ESTÁ visible → dice "Ocultar Panel"
});

// Evento mouse para las tarjetas de especialistas (efecto hover)
cards.forEach(card => { // ARROW FUNCTION
    card.addEventListener('mouseenter', () => { // ARROW FUNCTION
        card.style.backgroundColor = 'rgb(244, 244, 244)';
        card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => { // ARROW FUNCTION
        card.style.backgroundColor = '';
        card.style.transform = 'scale(1)';
    });
});

// ==================== CARRUSEL DE ESPECIALISTAS ====================
// Array con todas las imágenes/información del carrusel 
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

// Variables del carrusel
let currentIndex = 0; // Variable currentIndex para rastrear la imagen activa (índice actual)
let autoInterval = null; // Variable para almacenar el intervalo del avance automático
let isAutoPlaying = true; // Estado del avance automático (true = activo, false = pausado)
const AUTO_DELAY = 3000; // 3 segundos para el avance automático

// Elementos del DOM del carrusel
const track = document.getElementById('carouselTrack'); // Track que contiene todos los slides
const prevBtn = document.getElementById('prevSlide'); // Botón anterior
const nextBtn = document.getElementById('nextSlide'); // Botón siguiente
const dotsContainer = document.getElementById('carouselDots'); // Contenedor de los indicadores

// Función para calcular el ancho de cada slide (incluyendo el gap)
const getSlideWidth = () => {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return 0;
    // Obtiene el ancho del primer slide (incluyendo padding, margin, etc.)
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 30; // Gap definido en CSS
    return slideWidth + gap;
};

// Función para actualizar la posición del carrusel según el currentIndex
const updateCarousel = () => {
    if (!track) return;
    
    const slideWidth = getSlideWidth();
    if (slideWidth === 0) return;
    
    // Calcula el desplazamiento: cada slide tiene ancho + gap
    const desplazamiento = currentIndex * slideWidth;
    // Aplica la transformación para mover el track
    track.style.transform = `translateX(-${desplazamiento}px)`;
    
    // Actualiza los indicadores (dots)
    updateDots();
};

// Función para crear los indicadores (dots) dinámicamente
const createDots = () => {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = ''; // Limpia el contenedor
    
    // Crea un dot por cada slide
    for (let i = 0; i < carouselImages.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) {
            dot.classList.add('active'); // Marca el dot activo
        }
        // Agrega evento click para navegar al slide correspondiente
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }
};

// Función para actualizar la clase active en los dots
const updateDots = () => {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => { // ARROW FUNCTION
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
};

// Función nextSlide() - Avanza a la siguiente imagen
const nextSlide = () => {
    // Si es la última imagen, vuelve a la primera (efecto infinito)
    if (currentIndex >= carouselImages.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    updateCarousel();
};

// Función prevSlide() - Retrocede a la imagen anterior
const prevSlide = () => {
    // Si es la primera imagen, va a la última (efecto infinito)
    if (currentIndex <= 0) {
        currentIndex = carouselImages.length - 1;
    } else {
        currentIndex--;
    }
    updateCarousel();
};

// Función para ir a un slide específico (usado por los dots)
const goToSlide = (index) => {
    currentIndex = index;
    updateCarousel();
};

// Función para iniciar el avance automático (setInterval)
const startAutoPlay = () => {
    if (autoInterval) {
        clearInterval(autoInterval); // Limpia el intervalo existente
    }
    // setInterval() para avance automático cada 3 segundos
    autoInterval = setInterval(() => { // ARROW FUNCTION
        nextSlide();
    }, AUTO_DELAY);
    isAutoPlaying = true;
};


// Evento de click para el botón "siguiente"
if (nextBtn) {
    nextBtn.addEventListener('click', () => { // ARROW FUNCTION
        nextSlide();
        resetAutoPlay(); // Reinicia el temporizador automático si está activo
    });
}

// Evento de click para el botón "anterior"
if (prevBtn) {
    prevBtn.addEventListener('click', () => { // ARROW FUNCTION
        prevSlide();
        resetAutoPlay(); // Reinicia el temporizador automático si está activo
    });
}

// Evento de click para el botón de pausar/reanudar
if (toggleAutoBtn) {
    toggleAutoBtn.addEventListener('click', toggleAutoPlay);
}

// Función para inicializar el carrusel
const initCarousel = () => {
    createDots(); // Crea los indicadores
    updateCarousel(); // Posiciona el carrusel en el índice inicial (0)
    startAutoPlay(); // Inicia el avance automático cada 3 segundos
};

// Ejecutar la inicialización cuando el DOM esté listo
if (track && carouselImages.length > 0) {
    initCarousel();
}

// Ajustar el carrusel cuando la ventana cambie de tamaño (responsive) con debounce
let resizeTimer;
window.addEventListener('resize', () => { // ARROW FUNCTION
    // Debounce para evitar muchas ejecuciones
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { // ARROW FUNCTION
        if (track) {
            updateCarousel(); // Recalcula la posición al cambiar el tamaño
        }
    }, 250);
});