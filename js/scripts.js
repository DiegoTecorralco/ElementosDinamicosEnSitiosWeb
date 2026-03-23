// scripts.js (vanilla JS)


const sections = document.querySelectorAll('section'); //Selecciona todas las secciones (<section>) de la página
const btnPanel = document.getElementById('btn-panel'); //Selecciona el botón para ocultar el panel
const contenidoPanel = document.getElementById('contenido-panel'); //Selecciona el panel que se va a ocultar

//Evento de Scroll
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

//Evento para ocultar el panel
btnPanel.addEventListener('click', () => {
    contenidoPanel.classList.toggle('hidden-panel'); //Agrega o quita la clase hidden del panel cada vez que se hace clic en el botón
    btnPanel.textContent = contenidoPanel.classList.contains('hidden-panel') // Cambia el texto del botón dependiendo del estado
    ? 'Mostrar Panel' // Si el contenido ESTÁ oculto → dice "Mostrar Panel"
    : 'Ocultar Panel'; // Si el contenido ESTÁ visible → dice "Ocultar Panel"
});
    
