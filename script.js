// Crear partículas en el fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamaño aleatorio entre 5 y 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        // Animación
        particle.style.animation = `float ${Math.random() * 20 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Animación de entrada
function animateEntrance() {
    gsap.to("#formContainer", {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out"
    });
    
    gsap.to("#formTitle", {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        delay: 0.3, 
        ease: "power3.out"
    });
    
    document.querySelectorAll(".form-group").forEach((el, index) => {
        gsap.to(el, {
            opacity: 1, 
            x: 0, 
            duration: 0.8, 
            delay: 0.5 + (index * 0.1), 
            ease: "power3.out"
        });
    });
    
    gsap.to("#submitBtn", {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 1, 
        ease: "power3.out"
    });
}

// Animación al enviar el formulario
function animateFormSubmit() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animar botón de envío
        gsap.to("#submitBtn", {
            scale: 0.95, 
            duration: 0.1, 
            onComplete: () => {
                gsap.to("#submitBtn", {
                    scale: 1.05, 
                    duration: 0.3, 
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
        
        // Animar aparición del mensaje de éxito
        setTimeout(() => {
            successMessage.style.visibility = "visible";
            gsap.to(successMessage, {
                opacity: 1, 
                duration: 0.5, 
                ease: "power2.out"
            });
            
            // Efectos de confeti o partículas al enviar
            createSuccessParticles();
        }, 800);
    });
    
    // Resetear el formulario
    resetBtn.addEventListener('click', () => {
        form.reset();
        gsap.to(successMessage, {
            opacity: 0, 
            duration: 0.5, 
            ease: "power2.in",
            onComplete: () => {
                successMessage.style.visibility = "hidden";
            }
        });
    });
}

// Crear partículas de celebración al enviar formulario
function createSuccessParticles() {
    const container = document.getElementById('formContainer');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        
        // Colores aleatorios festivos
        const colors = ['#ff3366', '#5588ff', '#33cc66', '#ffcc33', '#cc33ff'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Posición inicial en el centro
        particle.style.top = '50%';
        particle.style.left = '50%';
        
        container.appendChild(particle);
        
        // Animación de explosión
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: 0,
            duration: 1 + Math.random(),
            ease: "power2.out",
            onComplete: () => {
                particle.remove();
            }
        });
    }
}

// Animación para los campos de entrada
function animateInputs() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02, 
                duration: 0.3, 
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1, 
                duration: 0.3, 
                ease: "power2.out"
            });
        });
    });
}

// Inicializar todas las animaciones al cargar la página
window.addEventListener('load', () => {
    createParticles();
    animateEntrance();
    animateFormSubmit();
    animateInputs();
});