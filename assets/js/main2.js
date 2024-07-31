/* ==== HEADER ==== */

window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
})

function toggleMenu(){
    const menuToggle = document.querySelector('.menuToggle');
    const navigation = document.querySelector('.navigation');
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

/* ==== CAROUSEL ==== */
const carousel = document.querySelector('.carousel');
const dotsContainer = document.querySelector('.dots');
const boxes = document.querySelectorAll('.box');
let totalBoxes;
let boxWidth; 
let index = 0;

function duplicateBoxes() {
    const content = document.querySelector('.content_carrousel');
    const clonedContent = content.cloneNode(true);
    content.parentNode.appendChild(clonedContent);
}

function createDots() {
    dotsContainer.innerHTML = ''; 
    for (let i = 0; i < totalBoxes; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === index) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateCarousel() {
    // Ajuste para o loop infinito
    if (index >= totalBoxes) {
        index = 0; // Voltar ao início
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(0px)`;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    } else {
        carousel.style.transform = `translateX(-${index * boxWidth}px)`;
    }
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === index) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function goToSlide(i) {
    index = i;
    updateCarousel();
}

function autoPlay() {
    index++;
    updateCarousel();
}

// Ajustar o totalBoxes e boxWidth para a largura da tela
function adjustForScreenWidth() {
    if (window.innerWidth <= 480) {
        // Lógica para tela pequena
        totalBoxes = boxes.length; // Ajuste conforme necessário
        boxWidth = boxes[0].offsetWidth + 70;
    } 
    else if(window.innerWidth <= 991){
        totalBoxes = boxes.length; // Ajuste conforme necessário
        boxWidth = boxes[0].offsetWidth + 75.7;
    }
    else {
        // Lógica para tela maior
        totalBoxes = boxes.length; // Duplicando o totalBoxes
        boxWidth = boxes[0].offsetWidth + 78.6; // Ajuste conforme necessário
    }
    createDots(); // Atualizar dots com base no totalBoxes ajustado
    updateCarousel(); // Recalcular a posição do carrossel
}

// Inicializar o carrossel
duplicateBoxes();
adjustForScreenWidth(); // Ajustar inicialmente com base na largura da tela
setInterval(autoPlay, 3000); 

window.addEventListener('resize', adjustForScreenWidth);
