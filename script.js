let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

// Function for next button 
nextBtn.onclick = function() {
    moveSlider('next')
}


// Function for prev button 
prevBtn.onclick = function() {
    moveSlider('prev')
}


function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = document.querySelectorAll('.thumbnail .item')
    
    if(direction === 'next'){
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }


    slider.addEventListener('animationend', function() {
        if(direction === 'next'){
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
    }, {once: true}) // Remove the event listener after it's triggered once
}

// JavaScript Corrigido e Otimizado
document.addEventListener('DOMContentLoaded', () => {
    const numeros = document.querySelectorAll('.numero-animado');
    
    // Configuração do Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
  
    // Função de animação
    function animarNumero(elemento, inicio, fim, duracao) {
      let start = inicio;
      const incremento = (fim - inicio) / (duracao / 10);
      
      const timer = setInterval(() => {
        start += incremento;
        elemento.textContent = Math.floor(start);
        
        if (start >= fim) {
          clearInterval(timer);
          elemento.textContent = fim.toLocaleString();
        }
      }, 10);
    }
  
    // Callback do Observer
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elemento = entry.target;
          elemento.classList.add('visible');
          
          const valorFinal = parseInt(elemento.getAttribute('data-valor'));
          animarNumero(elemento, 0, valorFinal, 2000);
          
          observer.unobserve(elemento);
        }
      });
    };
  
    // Inicialização
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    numeros.forEach(numero => {
      numero.textContent = '0'; // Valor inicial
      observer.observe(numero);
    });
  });
