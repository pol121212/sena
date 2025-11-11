// JavaScript para AgenVel
// ===== LOADER CORREGIDO - REEMPLAZA TU SCRIPT ACTUAL =====

// Datos de salud aleatorios
const healthData = {
    heartRates: ['72 lpm', '68 lpm', '75 lpm', '80 lpm', '65 lpm', '70 lpm', '78 lpm'],
    bloodPressures: ['120/80 mmHg', '118/76 mmHg', '122/82 mmHg', '115/75 mmHg', '125/85 mmHg'],
    sleepPatterns: ['7.5 horas', '6.8 horas', '8.2 horas', '7.0 horas', '7.8 horas'],
    medicalData: ['Análisis completado', 'Datos procesados', 'Evaluación en curso', 'Diagnóstico preliminar']
};

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateHealthData() {
    const heartRateElement = document.getElementById('heart-rate');
    const bloodPressureElement = document.getElementById('blood-pressure');
    const sleepPatternElement = document.getElementById('sleep-pattern');
    const medicalDataElement = document.getElementById('medical-data');
    
    if (heartRateElement) heartRateElement.textContent = getRandomItem(healthData.heartRates);
    if (bloodPressureElement) bloodPressureElement.textContent = getRandomItem(healthData.bloodPressures);
    if (sleepPatternElement) sleepPatternElement.textContent = getRandomItem(healthData.sleepPatterns);
    if (medicalDataElement) medicalDataElement.textContent = getRandomItem(healthData.medicalData);
}

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    const loaderContainer = document.getElementById('loader');
    if (loaderContainer) {
        loaderContainer.appendChild(particlesContainer);
        
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.classList.add('hidden');
            // Habilitar scroll en el body
            document.body.style.overflow = 'auto';
            console.log('Loader ocultado correctamente');
        }, 800);
    }
}

function simulateLoading() {
    let progress = 0;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    // Deshabilitar scroll durante el loader
    document.body.style.overflow = 'hidden';
    
    const interval = setInterval(() => {
        let increment;
        if (progress < 30) {
            increment = Math.random() * 5 + 1;
        } else if (progress < 70) {
            increment = Math.random() * 3 + 0.5;
        } else {
            increment = Math.random() * 2 + 0.2;
        }
        
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            progressFill.style.width = '100%';
            progressText.textContent = '100%';
            
            // Ocultar el loader cuando llegue al 100%
            setTimeout(hideLoader, 500);
        } else {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }
        
        // Actualizar datos de salud cada 20% de progreso
        if (Math.floor(progress) % 20 === 0) {
            updateHealthData();
        }
    }, 100);
}

function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) {
        console.log('No se encontró el loader, continuando...');
        return;
    }
    
    console.log('Iniciando loader...');
    
    // Crear partículas
    createParticles();
    
    // Inicializar datos de salud
    updateHealthData();
    
    // Actualizar datos cada 3 segundos
    const healthInterval = setInterval(updateHealthData, 3000);
    
    // Iniciar simulación de carga
    simulateLoading();
    
    // Limpiar intervalo cuando el loader se oculte
    setTimeout(() => {
        clearInterval(healthInterval);
    }, 10000);
    
    // Efecto de escritura
    const loadingText = document.querySelector('.loading-text p');
    if (loadingText) {
        const originalText = loadingText.textContent;
        loadingText.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < originalText.length) {
                loadingText.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }
    
    // Fallback: Ocultar loader después de 8 segundos máximo
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            console.log('Fallback: Ocultando loader por timeout');
            hideLoader();
        }
    }, 8000);
}

// Carrusel
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    // Crear dots de navegación
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Ir a slide específico
    function goToSlide(slideIndex) {
        // Ocultar todas las slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Mostrar la slide actual
        slides[slideIndex].classList.add('active');
        
        // Actualizar dots
        updateDots(slideIndex);
        
        currentSlide = slideIndex;
    }

    // Actualizar dots activos
    function updateDots(slideIndex) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }

    // Siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }

    // Slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }

    // Auto-avance
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    function setupEventListeners() {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        // Pausar auto-avance al interactuar
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        // Touch events para móviles
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe izquierda
                } else {
                    prevSlide(); // Swipe derecha
                }
            }
        }
    }

    // Precargar imágenes
    function preloadImages() {
        for (let i = 1; i <= slideCount; i++) {
            const img = new Image();
            img.src = `assets/images/carrusel${i}.jpg`;
        }
    }

    // Inicializar
    function init() {
        createDots();
        setupEventListeners();
        preloadImages();
        startAutoSlide();
        
        console.log('Carrusel inicializado con', slideCount, 'imágenes locales');
    }

    init();
}

// Control del video de fondo
function setupVideoControls() {
    const video = document.getElementById('hero-video');
    const playPauseBtn = document.getElementById('play-pause');
    const muteUnmuteBtn = document.getElementById('mute-unmute');
    
    if (video && playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '⏸️';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '▶️';
            }
        });
    }
    
    if (video && muteUnmuteBtn) {
        muteUnmuteBtn.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                muteUnmuteBtn.innerHTML = '🔊';
            } else {
                video.muted = true;
                muteUnmuteBtn.innerHTML = '🔇';
            }
        });
    }
    
    // Pausar video cuando no está visible (opcional, para mejorar rendimiento)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (video && entry.isIntersecting) {
                video.play();
            } else if (video) {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    
    if (video) {
        observer.observe(video);
    }
}

// Función para crear estrellas decorativas
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Tamaño aleatorio entre 1 y 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Posición aleatoria
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Retraso de animación aleatorio
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
}
function initBlog() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Filtrado de artículos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrar artículos
            blogCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Efectos hover mejorados para tarjetas
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Sistema de likes (simulado)
    const likeButtons = document.querySelectorAll('.blog-likes');
    likeButtons.forEach(likeBtn => {
        likeBtn.style.cursor = 'pointer';
        likeBtn.addEventListener('click', function() {
            let likes = parseInt(this.textContent);
            likes++;
            this.textContent = likes;
            this.style.color = '#00c6ff';
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    console.log('Blog de salud inicializado');
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    initLoader();
    initCarousel();
    createStars();
    setupVideoControls();
    initBlog();
    
    // Menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Efecto de aparición de secciones
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    });
    
    // Activar la primera sección al cargar
    document.querySelector('section').classList.add('visible');
    
    console.log('AgenVel completamente inicializado');
});