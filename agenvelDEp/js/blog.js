
        // ===== SISTEMA DE BLOG =====

        class BlogSystem {
            constructor() {
                this.init();
            }

            init() {
                console.log('Inicializando sistema de blog...');
                this.setupLoader();
                this.setupEventListeners();
                this.setupFilters();
                this.setupVideoModal();
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
                    
                }, 100);
            }

            hideLoader() {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                        console.log('Loader del blog ocultado correctamente');
                    }, 800);
                }
            }

            // ===== FILTROS DE ARTÍCULOS =====
            setupFilters() {
                const filterButtons = document.querySelectorAll('.filter-btn');
                const blogCards = document.querySelectorAll('.blog-card');

                filterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        // Remover clase active de todos los botones
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        // Agregar clase active al botón clickeado
                        button.classList.add('active');
                        
                        const filter = button.getAttribute('data-filter');
                        
                        blogCards.forEach(card => {
                            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                                card.style.display = 'flex';
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
            }

            // ===== MODAL DE VIDEO =====
            setupVideoModal() {
                const videoModal = document.getElementById('video-modal');
                const closeModal = document.getElementById('close-modal');
                const videoContainer = document.getElementById('video-container');
                const videoPlayButtons = document.querySelectorAll('.video-play-btn');

                // Abrir modal al hacer clic en un botón de reproducción
                videoPlayButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const videoUrl = button.getAttribute('data-video');
                        videoContainer.innerHTML = `<iframe src="${videoUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                        videoModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });
                });

                // Cerrar modal
                closeModal.addEventListener('click', () => {
                    videoModal.classList.remove('active');
                    videoContainer.innerHTML = '';
                    document.body.style.overflow = 'auto';
                });

                // Cerrar modal al hacer clic fuera del contenido
                videoModal.addEventListener('click', (e) => {
                    if (e.target === videoModal) {
                        videoModal.classList.remove('active');
                        videoContainer.innerHTML = '';
                        document.body.style.overflow = 'auto';
                    }
                });
            }

            // ===== EVENT LISTENERS =====
            setupEventListeners() {
                // Búsqueda
                const searchBox = document.querySelector('.search-box');
                const searchBtn = document.querySelector('.search-btn');

                searchBtn.addEventListener('click', () => {
                    this.performSearch(searchBox.value);
                });

                searchBox.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.performSearch(searchBox.value);
                    }
                });

                // Newsletter
                const newsletterForm = document.querySelector('.newsletter-form');
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.subscribeNewsletter(newsletterForm.querySelector('.newsletter-input').value);
                });
            }

            performSearch(query) {
                if (query.trim() === '') return;
                
                // Simular búsqueda
                this.showNotification(`Buscando: "${query}"`);
                
                // Aquí normalmente harías una petición a un servidor
                // Por ahora, solo simulamos la búsqueda
                setTimeout(() => {
                    this.showNotification(`Se encontraron 15 resultados para "${query}"`);
                }, 1000);
            }

            subscribeNewsletter(email) {
                // Simular suscripción
                this.showNotification(`¡Gracias por suscribirte con ${email}!`);
                
                // Limpiar el formulario
                document.querySelector('.newsletter-input').value = '';
            }

            showNotification(message) {
                // Crear elemento de notificación
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: rgba(0, 198, 255, 0.9);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    z-index: 10000;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease;
                `;
                
                notification.textContent = message;
                document.body.appendChild(notification);
                
                // Remover después de 3 segundos
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
                
                // Añadir estilos de animación si no existen
                if (!document.getElementById('notification-styles')) {
                    const style = document.createElement('style');
                    style.id = 'notification-styles';
                    style.textContent = `
                        @keyframes slideIn {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                        @keyframes slideOut {
                            from { transform: translateX(0); opacity: 1; }
                            to { transform: translateX(100%); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }

        // ===== INICIALIZACIÓN =====
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Inicializando página de blog...');
            new BlogSystem();
        });