
        // ===== SISTEMA DE CÓMO FUNCIONA INTERACTIVO =====

        class InteractiveHowItWorksSystem {
            constructor() {
                this.init();
            }

            init() {
                console.log('Inicializando sistema cómo funciona interactivo...');
                this.setupLoader();
                this.setupEventListeners();
                this.setupAnimations();
                this.setupScrollEffects();
                this.createParticles();
            }

            // ===== SISTEMA DE LOADER INTERACTIVO =====
            setupLoader() {
                this.simulateLoading();
            }

            simulateLoading() {
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
                        
                        // Ocultar el loader
                        setTimeout(() => {
                            this.hideLoader();
                        }, 500);
                    } else {
                        progressFill.style.width = `${progress}%`;
                        progressText.textContent = `${Math.round(progress)}%`;
                    }
                    
                    // Actualizar textos de carga
                    this.updateLoadingTexts(progress);
                    
                }, 100);
            }

            updateLoadingTexts(progress) {
                const processEl = document.getElementById('load-process');
                const aiEl = document.getElementById('load-ai');
                const tutorialsEl = document.getElementById('load-tutorials');
                const optimizationEl = document.getElementById('load-optimization');

                if (progress < 25) {
                    processEl.textContent = 'Cargando...';
                } else if (progress < 50) {
                    processEl.textContent = '✓ Completado';
                    aiEl.textContent = 'Inicializando...';
                } else if (progress < 75) {
                    aiEl.textContent = '✓ Completado';
                    tutorialsEl.textContent = 'Preparando...';
                } else if (progress < 90) {
                    tutorialsEl.textContent = '✓ Completado';
                    optimizationEl.textContent = 'Optimizando...';
                } else {
                    optimizationEl.textContent = '✓ Completado';
                }
            }

            hideLoader() {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                        console.log('Loader de cómo funciona ocultado correctamente');
                    }, 800);
                }
            }

            // ===== EVENT LISTENERS INTERACTIVOS =====
            setupEventListeners() {
                // Botón de reproducción de video
                const videoTrigger = document.getElementById('video-trigger');
                const videoModal = document.getElementById('video-modal');
                const closeModal = document.querySelector('.close-modal');

                if (videoTrigger) {
                    videoTrigger.addEventListener('click', () => {
                        videoModal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    });
                }

                if (closeModal) {
                    closeModal.addEventListener('click', () => {
                        videoModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    });
                }

                // Cerrar modal al hacer clic fuera
                videoModal.addEventListener('click', (e) => {
                    if (e.target === videoModal) {
                        videoModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });

                // Interacción con los pasos del proceso
                const stepContents = document.querySelectorAll('.step-content');
                stepContents.forEach(content => {
                    content.addEventListener('click', () => {
                        content.classList.toggle('expanded');
                    });
                });

                // Interacción con las tarjetas de demostración
                const demoCards = document.querySelectorAll('.demo-card');
                demoCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const step = card.getAttribute('data-step');
                        this.scrollToStep(step);
                    });
                });

                // Efecto de partículas en el círculo de IA
                const aiCircle = document.getElementById('ai-circle');
                if (aiCircle) {
                    aiCircle.addEventListener('mouseenter', () => {
                        this.activateParticles();
                    });
                }

                // Header scroll effect
                window.addEventListener('scroll', () => {
                    const header = document.getElementById('main-header');
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            }

            scrollToStep(step) {
                const targetStep = document.querySelector(`.process-step[data-step="${step}"]`);
                if (targetStep) {
                    const yOffset = -100;
                    const y = targetStep.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                    
                    // Resaltar el paso
                    targetStep.classList.add('visible');
                    const stepContent = targetStep.querySelector('.step-content');
                    if (stepContent) {
                        stepContent.classList.add('expanded');
                    }
                }
            }

            // ===== SISTEMA DE PARTÍCULAS =====
            createParticles() {
                const particlesContainer = document.getElementById('ai-particles');
                if (!particlesContainer) return;

                for (let i = 0; i < 15; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    // Posición aleatoria
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    particle.style.left = `${left}%`;
                    particle.style.top = `${top}%`;
                    
                    // Tamaño aleatorio
                    const size = Math.random() * 6 + 4;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    // Retraso de animación aleatorio
                    const delay = Math.random() * 5;
                    particle.style.animationDelay = `${delay}s`;
                    
                    particlesContainer.appendChild(particle);
                }
            }

            activateParticles() {
                const particles = document.querySelectorAll('.particle');
                particles.forEach(particle => {
                    particle.style.animation = 'particle-float 6s infinite linear';
                });
            }

            // ===== ANIMACIONES =====
            setupAnimations() {
                // Animación para los pasos del proceso al hacer scroll
                const observerOptions = {
                    threshold: 0.2,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, observerOptions);

                // Observar los pasos del proceso
                const steps = document.querySelectorAll('.process-step');
                steps.forEach(step => {
                    observer.observe(step);
                });

                // Observar las tarjetas de beneficios
                const benefitCards = document.querySelectorAll('.benefit-card');
                benefitCards.forEach((card, index) => {
                    card.style.transitionDelay = `${index * 0.1}s`;
                    observer.observe(card);
                });
            }

            // ===== EFECTOS DE SCROLL =====
            setupScrollEffects() {
                // Efecto parallax en el hero
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const hero = document.querySelector('.how-it-works-hero');
                    if (hero) {
                        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                    }
                });
            }
        }

        // ===== INICIALIZACIÓN =====
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Inicializando página cómo funciona interactiva...');
            new InteractiveHowItWorksSystem();
        });