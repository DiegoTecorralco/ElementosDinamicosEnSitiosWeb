// scripts.js (vanilla JS)


//Evento de Scroll
const sections = document.querySelectorAll('section'); //Selecciona todas las secciones (<section>) de la página

window.addEventListener('scroll', () => { //Escucha cuando haces scroll (bajas o subes la página)   
    sections.forEach(section => { //Recorre cada sección una por una
        const rect = section.getBoundingClientRect(); //Obtiene la posición de la sección en la pantalla
        //rect.top → qué tan lejos está del borde superior
        //rect.bottom → dónde termina
        if (rect.top < window.innerHeight && rect.bottom > 0) { //si la sección está dentro de la pantalla (visible)
            section.classList.add('visible'); //agrega clase visible
            section.classList.remove('hidden');  //quita la clase hidden
        }
    });
});