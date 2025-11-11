
        // ===== SISTEMA DE CONSULTA IA M.A.V. =====

        class MavSystem {
            constructor() {
                this.chatHistory = null;
                this.chatInput = null;
                this.sendButton = null;
                this.init();
            }

            init() {
                console.log('Inicializando sistema M.A.V....');
                this.setupLoader();
                this.setupChat();
                this.setupEventListeners();
                this.updateCurrentTime();
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
                const modelEl = document.getElementById('load-model');
                const databaseEl = document.getElementById('load-database');
                const interfaceEl = document.getElementById('load-interface');
                const optimizationEl = document.getElementById('load-optimization');

                if (progress < 25) {
                    modelEl.textContent = 'Cargando...';
                } else if (progress < 50) {
                    modelEl.textContent = '✓ Completado';
                    databaseEl.textContent = 'Verificando...';
                } else if (progress < 75) {
                    databaseEl.textContent = '✓ Completado';
                    interfaceEl.textContent = 'Preparando...';
                } else if (progress < 90) {
                    interfaceEl.textContent = '✓ Completado';
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
                        console.log('Loader de M.A.V. ocultado correctamente');
                    }, 800);
                }
            }

            // ===== SISTEMA DE CHAT =====
            setupChat() {
                this.chatHistory = document.getElementById('chat-history');
                this.chatInput = document.getElementById('chat-input');
                this.sendButton = document.getElementById('send-message');
                
                // Respuestas predefinidas de M.A.V.
                this.mavResponses = {
                    symptoms: [
                        "Basado en los síntomas que describes, podría tratarse de varias condiciones. Te recomiendo observar si los síntomas persisten por más de 48 horas y consultar con un especialista para un diagnóstico preciso.",
                        "Los síntomas que mencionas pueden estar relacionados con diferentes condiciones médicas. Es importante considerar factores como la duración, intensidad y otros síntomas acompañantes. ¿Podrías proporcionar más detalles?",
                        "Entiendo tu preocupación. Según la información que proporcionas, estos síntomas podrían indicar una condición que requiere evaluación médica. Te sugiero agendar una cita para una valoración completa."
                    ],
                    medication: [
                        "Es importante seguir siempre las indicaciones de tu médico respecto a la medicación. No modifiques la dosis sin consultar primero con un profesional de la salud.",
                        "Los efectos secundarios de los medicamentos pueden variar según cada persona. Si experimentas reacciones adversas, comunícate con tu médico lo antes posible.",
                        "Para información específica sobre medicamentos, consulta siempre con un farmacéutico o médico. Ellos pueden proporcionarte detalles sobre interacciones y contraindicaciones."
                    ],
                    "first-aid": [
                        "En caso de emergencia, lo primero es mantener la calma y llamar a los servicios de emergencia. Mientras llega la ayuda, sigue las instrucciones básicas de primeros auxilios para la situación.",
                        "Para heridas menores, limpia la zona con agua y jabón, aplica un antiséptico y cubre con un vendaje estéril. Si la herida es profunda o muestra signos de infección, busca atención médica.",
                        "En caso de quemaduras, enfría la zona con agua corriente durante al menos 10 minutos. No apliques hielo directamente ni uses remedios caseros como pasta dental o mantequilla."
                    ],
                    nutrition: [
                        "Una dieta balanceada es fundamental para mantener una buena salud. Incluye frutas, verduras, proteínas magras y granos enteros en tu alimentación diaria.",
                        "La hidratación es clave para el funcionamiento óptimo del cuerpo. Intenta beber al menos 8 vasos de agua al día, ajustando según tu nivel de actividad física y clima.",
                        "Cada persona tiene necesidades nutricionales diferentes según su edad, género, nivel de actividad y condiciones de salud. Un nutricionista puede ayudarte a crear un plan personalizado."
                    ],
                    "mental-health": [
                        "Cuidar de tu salud mental es tan importante como cuidar de tu salud física. Si experimentas ansiedad, estrés persistente o cambios de humor significativos, considera buscar apoyo profesional.",
                        "Las técnicas de relajación como la respiración profunda, meditación y ejercicio regular pueden ayudar a manejar el estrés y la ansiedad. Encuentra lo que funcione mejor para ti.",
                        "No hay vergüenza en buscar ayuda para tu salud mental. Los profesionales de la salud mental están capacitados para proporcionarte las herramientas y apoyo que necesitas."
                    ],
                    chronic: [
                        "El manejo de enfermedades crónicas requiere un enfoque integral que incluya seguimiento médico regular, medicación adecuada y cambios en el estilo de vida.",
                        "Es importante mantener un registro de tus síntomas y cualquier cambio que notes para compartir con tu médico en las consultas de seguimiento.",
                        "El autocuidado es fundamental en el manejo de condiciones crónicas. Sigue las recomendaciones de tu equipo médico y no dudes en contactarlos si experimentas cambios significativos."
                    ]
                };
            }

            // ===== EVENT LISTENERS =====
            setupEventListeners() {
                // Envío de mensajes
                if (this.sendButton) {
                    this.sendButton.addEventListener('click', () => {
                        this.sendMessage();
                    });
                }

                if (this.chatInput) {
                    this.chatInput.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            this.sendMessage();
                        }
                    });
                }

                // Botones de función
                const attachFile = document.getElementById('attach-file');
                if (attachFile) {
                    attachFile.addEventListener('click', () => {
                        this.showNotification('Función de adjuntar archivo disponible próximamente');
                    });
                }

                const addImage = document.getElementById('add-image');
                if (addImage) {
                    addImage.addEventListener('click', () => {
                        this.showNotification('Función de agregar imagen disponible próximamente');
                    });
                }

                const voiceInput = document.getElementById('voice-input');
                if (voiceInput) {
                    voiceInput.addEventListener('click', () => {
                        this.showNotification('Función de entrada por voz disponible próximamente');
                    });
                }

                // Presets de consulta
                const presetButtons = document.querySelectorAll('.chat-presets li');
                presetButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        // Remover clase active de todos los botones
                        presetButtons.forEach(btn => btn.classList.remove('active'));
                        // Agregar clase active al botón clickeado
                        button.classList.add('active');
                        
                        const preset = button.getAttribute('data-preset');
                        this.setPresetMessage(preset);
                    });
                });

                // Tags rápidos
                const tags = document.querySelectorAll('.quick-tags span');
                tags.forEach(tag => {
                    tag.addEventListener('click', () => {
                        if (this.chatInput) {
                            this.chatInput.value = tag.textContent;
                            this.chatInput.focus();
                        }
                    });
                });
            }

            setPresetMessage(preset) {
                const messages = {
                    symptoms: "Me gustaría analizar algunos síntomas que he estado experimentando...",
                    medication: "Necesito información sobre un medicamento...",
                    "first-aid": "¿Qué debo hacer en caso de...?",
                    nutrition: "Me gustaría recibir consejos sobre nutrición para...",
                    "mental-health": "He estado experimentando algunos problemas relacionados con mi salud mental...",
                    chronic: "Tengo una condición crónica y me gustaría saber más sobre..."
                };

                if (this.chatInput) {
                    this.chatInput.value = messages[preset] || "Tengo una consulta sobre...";
                    this.chatInput.focus();
                }
            }

            sendMessage() {
                if (!this.chatInput) return;
                
                const message = this.chatInput.value.trim();
                
                if (message === '') {
                    this.showNotification('Por favor, escribe un mensaje antes de enviar');
                    return;
                }

                // Agregar mensaje del usuario al historial
                this.addMessage(message, 'user');
                
                // Limpiar el input
                this.chatInput.value = '';
                
                // Mostrar indicador de que M.A.V. está escribiendo
                this.showTypingIndicator();
                
                // Simular respuesta de M.A.V. después de un delay
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.generateMavResponse(message);
                }, 1500);
            }

            addMessage(text, sender) {
                if (!this.chatHistory) return;
                
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
                
                const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                
                if (sender === 'user') {
                    messageDiv.innerHTML = `
                        <div class="message-header">
                            <div class="message-avatar user-avatar">TÚ</div>
                            <span>Usuario</span>
                        </div>
                        ${text}
                        <div class="message-time">${time}</div>
                    `;
                } else {
                    messageDiv.innerHTML = `
                        <div class="message-header">
                            <div class="message-avatar ai-avatar">M.A.V.</div>
                            <span>Asistente Médico Virtual</span>
                        </div>
                        ${text}
                        <div class="message-time">${time}</div>
                    `;
                }
                
                this.chatHistory.appendChild(messageDiv);
                this.scrollToBottom();
            }

            showTypingIndicator() {
                if (!this.chatHistory) return;
                
                const typingDiv = document.createElement('div');
                typingDiv.classList.add('ai-typing');
                typingDiv.id = 'typing-indicator';
                
                typingDiv.innerHTML = `
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <span>M.A.V. está escribiendo...</span>
                `;
                
                this.chatHistory.appendChild(typingDiv);
                this.scrollToBottom();
            }

            hideTypingIndicator() {
                const typingIndicator = document.getElementById('typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
            }

            generateMavResponse(userMessage) {
                // Determinar el tipo de consulta basado en palabras clave
                let responseType = 'general';
                const message = userMessage.toLowerCase();
                
                if (message.includes('síntoma') || message.includes('dolor') || 
                    message.includes('fiebre') || message.includes('malestar')) {
                    responseType = 'symptoms';
                } else if (message.includes('medicamento') || message.includes('pastilla') || message.includes('tratamiento') || message.includes('droga')) {
                    responseType = 'medication';
                } else if (message.includes('primeros auxilios') || message.includes('emergencia') || message.includes('accidente') || message.includes('herida')) {
                    responseType = 'first-aid';
                } else if (message.includes('nutrición') || message.includes('dieta') || message.includes('alimentación') || message.includes('comida')) {
                    responseType = 'nutrition';
                } else if (message.includes('ansiedad') || message.includes('depresión') || message.includes('estrés') || message.includes('mental')) {
                    responseType = 'mental-health';
                } else if (message.includes('crónic') || message.includes('diabetes') || message.includes('hipertensión') || message.includes('asma')) {
                    responseType = 'chronic';
                }
                
                // Seleccionar una respuesta aleatoria del tipo correspondiente
                const responses = this.mavResponses[responseType] || this.mavResponses.symptoms;
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                // Agregar mensaje de M.A.V. al historial
                this.addMessage(randomResponse, 'ai');
            }

            scrollToBottom() {
                if (this.chatHistory) {
                    this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
                }
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
                        if (document.body.contains(notification)) {
                            document.body.removeChild(notification);
                        }
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

            updateCurrentTime() {
                const now = new Date();
                const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const currentTimeElement = document.getElementById('current-time');
                if (currentTimeElement) {
                    currentTimeElement.textContent = timeString;
                }
            }
        }

        // ===== INICIALIZACIÓN =====
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Inicializando página de consulta M.A.V....');
            window.mavSystem = new MavSystem();
        });