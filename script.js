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
