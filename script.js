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
