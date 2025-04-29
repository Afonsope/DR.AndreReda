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
    // Get all slider and thumbnail items
    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = document.querySelectorAll('.thumbnail .item')
    
    if(direction === 'next'){
        // Move first item to the end for next slide
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        // Move last item to the beginning for previous slide
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }

    // Remove animation class after animation ends
    slider.addEventListener('animationend', function() {
        if(direction === 'next'){
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
    }, {once: true}) // Remove the event listener after it's triggered once
}

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
