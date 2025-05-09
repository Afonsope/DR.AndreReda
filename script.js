// Select DOM elements for slider navigation
let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

// Select main slider elements
let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

// Initialize slider by moving first thumbnail item to the end
thumbnail.appendChild(thumbnailItems[0])

// Event handler for next button click
nextBtn.onclick = function() {
    moveSlider('next')
}

// Event handler for previous button click
prevBtn.onclick = function() {
    moveSlider('prev')
}

/**
 * Moves the slider in the specified direction
 * @param {string} direction - 'next' or 'prev' to determine slide direction
 */
function moveSlider(direction) {
  const sliderItems = sliderList.querySelectorAll('.item');
  const thumbnailItems = document.querySelectorAll('.thumbnail .item');
  
  // Remove classe active do item atual
  const currentActive = slider.querySelector('.item.active');
  if(currentActive) currentActive.classList.remove('active');
  
  if(direction === 'next'){
      sliderList.appendChild(sliderItems[0]);
      thumbnail.appendChild(thumbnailItems[0]);
  } else {
      sliderList.prepend(sliderItems[sliderItems.length - 1]);
      thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
  }
  
  // Adiciona classe active ao novo item após pequeno delay
  setTimeout(() => {
      const newActive = sliderList.querySelector('.item:first-child');
      newActive.classList.add('active');
  }, 50);
}

// Inicializa o primeiro item como ativo
document.addEventListener('DOMContentLoaded', () => {
  sliderList.querySelector('.item').classList.add('active');

    // Remove animation class after animation ends
    slider.addEventListener('animationend', function() {
        if(direction === 'next'){
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
    }, {once: true}) // Remove the event listener after it's triggered once
});

// Initialize number animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with number animation
    const numeros = document.querySelectorAll('.numero-animado');
    
    // Configuration for Intersection Observer
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '0px', // No margin
      threshold: 0.5 // Trigger when 50% of element is visible
    };
  
    /**
     * Animates a number from start to end value
     * @param {HTMLElement} elemento - The element containing the number
     * @param {number} inicio - Starting value
     * @param {number} fim - Ending value
     * @param {number} duracao - Animation duration in milliseconds
     */
    function animarNumero(elemento, inicio, fim, duracao) {
      let start = inicio;
      // Calculate increment per animation frame
      const incremento = (fim - inicio) / (duracao / 10);
      
      // Create animation interval
      const timer = setInterval(() => {
        start += incremento;
        elemento.textContent = Math.floor(start);
        
        // Stop animation when reaching target value
        if (start >= fim) {
          clearInterval(timer);
          elemento.textContent = fim.toLocaleString(); // Format number with thousands separator
        }
      }, 10);
    }
  
    /**
     * Callback function for Intersection Observer
     * @param {Array} entries - Array of observed elements
     * @param {IntersectionObserver} observer - The observer instance
     */
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elemento = entry.target;
          elemento.classList.add('visible');
          
          // Get final value from data attribute and start animation
          const valorFinal = parseInt(elemento.getAttribute('data-valor'));
          animarNumero(elemento, 0, valorFinal, 2000);
          
          // Stop observing after animation starts
          observer.unobserve(elemento);
        }
      });
    };
  
    // Create and initialize Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Start observing each number element
    numeros.forEach(numero => {
      numero.textContent = '0'; // Set initial value
      observer.observe(numero);
    });
});

// Detecta Safari/MacOS e aplica correções
if (navigator.vendor.indexOf('Apple') > -1 && 
    !navigator.userAgent.match(/(Chrome|Edge)/i)) {
  
  document.documentElement.style.setProperty(
    '--macos-line-height', 
    '1.25 !important'
  );
  
  const styles = `
    .slider .list .item .content .description {
      line-height: var(--macos-line-height);
      word-spacing: -0.5px;
      margin-top: -3px !important;
    }
  `;
  
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
