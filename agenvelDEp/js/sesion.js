
        // ===== SISTEMA DE INICIO DE SESIÓN =====

        document.addEventListener('DOMContentLoaded', function() {
            // Crear estrellas en el fondo
            createStars();
            
            // Referencias a los elementos del formulario
            const loginForm = document.querySelector('.login-form');
            const registerForm = document.querySelector('.register-form');
            const showRegister = document.getElementById('showRegister');
            const showLogin = document.getElementById('showLogin');
            
            // Mostrar formulario de registro
            showRegister.addEventListener('click', function(e) {
                e.preventDefault();
                loginForm.classList.add('hidden');
                setTimeout(() => {
                    loginForm.style.display = 'none';
                    registerForm.style.display = 'block';
                    setTimeout(() => {
                        registerForm.classList.remove('hidden');
                    }, 50);
                }, 500);
            });
            
            // Mostrar formulario de inicio de sesión
            showLogin.addEventListener('click', function(e) {
                e.preventDefault();
                registerForm.classList.add('hidden');
                setTimeout(() => {
                    registerForm.style.display = 'none';
                    loginForm.style.display = 'block';
                    setTimeout(() => {
                        loginForm.classList.remove('hidden');
                    }, 50);
                }, 500);
            });
            
            // Manejar envío de formularios
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                handleLogin();
            });
            
            document.getElementById('registerForm').addEventListener('submit', function(e) {
                e.preventDefault();
                handleRegister();
            });
        });

        // Crear estrellas animadas en el fondo
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const starCount = 150;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                // Posición aleatoria
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                // Tamaño aleatorio
                const size = Math.random() * 3 + 1;
                
                // Duración de animación aleatoria
                const duration = Math.random() * 5 + 3;
                const delay = Math.random() * 5;
                
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.animationDuration = `${duration}s`;
                star.style.animationDelay = `${delay}s`;
                
                starsContainer.appendChild(star);
            }
        }

        // Manejar inicio de sesión
        function handleLogin() {
            const submitBtn = document.querySelector('#loginForm .submit-btn');
            const originalText = submitBtn.textContent;
            
            // Simular proceso de inicio de sesión
            submitBtn.textContent = 'Iniciando sesión...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Simular éxito
                showNotification('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
                
                // Restaurar botón
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Redirigir (simulado)
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }, 2000);
            }, 1500);
        }

        // Manejar registro
        function handleRegister() {
            const submitBtn = document.querySelector('#registerForm .submit-btn');
            const originalText = submitBtn.textContent;
            
            // Simular proceso de registro
            submitBtn.textContent = 'Creando cuenta...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Simular éxito
                showNotification('¡Cuenta creada exitosamente! Redirigiendo...', 'success');
                
                // Restaurar botón
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Redirigir (simulado)
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }, 2000);
            }, 1500);
        }

        // Mostrar notificación
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                z-index: 10000;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease;
            `;
            
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
