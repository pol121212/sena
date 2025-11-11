
        // ===== SISTEMA DE CONTACTO =====

        class ContactSystem {
            constructor() {
                this.init();
            }

            init() {
                console.log('Inicializando sistema de contacto...');
                this.setupLoader();
                this.setupEventListeners();
                this.setupFAQ();
            }

            // ===== SISTEMA DE LOADER =====
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
                const infoEl = document.getElementById('load-info');
                const formEl = document.getElementById('load-form');
                const serversEl = document.getElementById('load-servers');
                const videoEl = document.getElementById('load-video');

                if (progress < 25) {
                    infoEl.textContent = 'Cargando...';
                } else if (progress < 50) {
                    infoEl.textContent = '✓ Completado';
                    formEl.textContent = 'Inicializando...';
                } else if (progress < 75) {
                    formEl.textContent = '✓ Completado';
                    serversEl.textContent = 'Conectando...';
                } else if (progress < 90) {
                    serversEl.textContent = '✓ Completado';
                    videoEl.textContent = 'Preparando...';
                } else {
                    videoEl.textContent = '✓ Completado';
                }
            }

            hideLoader() {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                        console.log('Loader de contacto ocultado correctamente');
                    }, 800);
                }
            }

            // ===== FORMULARIO DE CONTACTO =====
            setupEventListeners() {
                const contactForm = document.getElementById('contactForm');
                if (contactForm) {
                    contactForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.handleFormSubmission();
                    });
                }
            }

            handleFormSubmission() {
                // Obtener datos del formulario
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };

                // Validar datos
                if (!this.validateForm(formData)) {
                    return;
                }

                // Simular envío
                this.showLoadingState();

                setTimeout(() => {
                    this.showSuccessMessage();
                    document.getElementById('contactForm').reset();
                }, 2000);
            }

            validateForm(formData) {
                if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    alert('Por favor completa todos los campos obligatorios');
                    return false;
                }

                if (!this.isValidEmail(formData.email)) {
                    alert('Por favor ingresa un correo electrónico válido');
                    return false;
                }

                return true;
            }

            isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            showLoadingState() {
                const submitBtn = document.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                // Restaurar después de 2 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }

            showSuccessMessage() {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            }

            // ===== SISTEMA FAQ =====
            setupFAQ() {
                const faqItems = document.querySelectorAll('.faq-item');
                
                faqItems.forEach(item => {
                    const question = item.querySelector('.faq-question');
                    
                    question.addEventListener('click', () => {
                        // Cerrar otros items abiertos
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        // Abrir/cerrar el item actual
                        item.classList.toggle('active');
                    });
                });
            }
        }

        // ===== INICIALIZACIÓN =====
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Inicializando página de contacto...');
            new ContactSystem();
        });