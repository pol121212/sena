
        // ===== SISTEMA DE AGENDAMIENTO COMPLETO =====

        class AppointmentSystem {
            constructor() {
                this.doctors = [];
                this.selectedDoctor = null;
                this.selectedDate = null;
                this.selectedTime = null;
                this.currentStep = 1;
                this.currentMonth = new Date();
                
                this.init();
            }

            init() {
                console.log('Inicializando sistema de agendamiento...');
                this.setupLoader();
                this.loadDoctors();
                this.setupEventListeners();
                this.renderCalendar();
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
                const doctorsEl = document.getElementById('load-doctors');
                const availabilityEl = document.getElementById('load-availability');
                const clinicsEl = document.getElementById('load-clinics');
                const calendarEl = document.getElementById('load-calendar');

                if (progress < 25) {
                    doctorsEl.textContent = 'Cargando...';
                } else if (progress < 50) {
                    doctorsEl.textContent = '✓ Completado';
                    availabilityEl.textContent = 'Verificando...';
                } else if (progress < 75) {
                    availabilityEl.textContent = '✓ Completado';
                    clinicsEl.textContent = 'Conectando...';
                } else if (progress < 90) {
                    clinicsEl.textContent = '✓ Completado';
                    calendarEl.textContent = 'Inicializando...';
                } else {
                    calendarEl.textContent = '✓ Completado';
                }
            }

            hideLoader() {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                        console.log('Loader de agendación ocultado correctamente');
                    }, 800);
                }
            }

            // ===== SISTEMA DE MÉDICOS =====
            loadDoctors() {
                this.doctors = [
                    {
                        id: 1,
                        name: "Dr. Carlos Rodríguez",
                        specialty: "medicina-general",
                        specialtyName: "Medicina General",
                        experience: "12 años",
                        description: "Especialista en medicina familiar y seguimiento de pacientes crónicos. Atención personalizada y diagnóstico preciso.",
                        availability: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
                        price: 30,
                        rating: 4.8,
                        reviews: 124,
                        avatar: "👨‍⚕️",
                        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        clinic: "Clínica Salud Integral - Sede Central"
                    },
                    {
                        id: 2,
                        name: "Dra. María González",
                        specialty: "pediatria",
                        specialtyName: "Pediatría",
                        experience: "8 años",
                        description: "Especialista en cuidado infantil, vacunación y desarrollo pediátrico. Trato amable con los más pequeños.",
                        availability: ["Lunes", "Miércoles", "Viernes"],
                        price: 35,
                        rating: 4.9,
                        reviews: 89,
                        avatar: "👩‍⚕️",
                        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        clinic: "Clínica Salud Integral - Sede Norte"
                    },
                    {
                        id: 3,
                        name: "Dra. Ana Martínez",
                        specialty: "ginecologia",
                        specialtyName: "Ginecología",
                        experience: "15 años",
                        description: "Especialista en salud femenina, controles preventivos y seguimiento. Enfoque integral y empático.",
                        availability: ["Martes", "Jueves", "Sábado"],
                        price: 40,
                        rating: 4.7,
                        reviews: 156,
                        avatar: "👩‍⚕️",
                        image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        clinic: "Clínica Salud Integral - Sede Central"
                    },
                    {
                        id: 4,
                        name: "Dr. Roberto Sánchez",
                        specialty: "dermatologia",
                        specialtyName: "Dermatología",
                        experience: "10 años",
                        description: "Especialista en enfermedades de la piel, acné y tratamientos estéticos. Resultados visibles y duraderos.",
                        availability: ["Lunes", "Miércoles", "Viernes"],
                        price: 40,
                        rating: 4.6,
                        reviews: 78,
                        avatar: "👨‍⚕️",
                        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        clinic: "Clínica Salud Integral - Sede Sur"
                    },
                    {
                        id: 5,
                        name: "Dra. Laura Fernández",
                        specialty: "psicologia",
                        specialtyName: "Psicología",
                        experience: "6 años",
                        description: "Especialista en terapia cognitivo-conductual y salud mental. Espacio seguro para tu bienestar emocional.",
                        availability: ["Lunes", "Martes", "Jueves", "Viernes"],
                        price: 35,
                        rating: 4.8,
                        reviews: 67,
                        avatar: "👩‍⚕️",
                        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        clinic: "Clínica Salud Integral - Sede Central"
                    },
                    {
                        id: 6,
                        name: "Dr. Miguel Torres",
                        specialty: "nutricion",
                        specialtyName: "Nutrición",
                        experience: "9 años",
                        description: "Especialista en planificación alimentaria y control de peso. Programas personalizados según tus metas.",
                        availability: ["Martes", "Miércoles", "Jueves"],
                        price: 30,
                        rating: 4.7,
                        reviews: 92,
                        avatar: "👨‍⚕️",
                        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        clinic: "Clínica Salud Integral - Sede Norte"
                    },
                    {
                        id: 7,
                        name: "Dra. Patricia López",
                        specialty: "cardiologia",
                        specialtyName: "Cardiología",
                        experience: "18 años",
                        description: "Especialista en enfermedades cardiovasculares y prevención. Cuidado integral del corazón.",
                        availability: ["Lunes", "Miércoles"],
                        price: 45,
                        rating: 4.9,
                        reviews: 134,
                        avatar: "👩‍⚕️",
                        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
                        clinic: "Clínica Salud Integral - Sede Central"
                    }
                ];

                this.renderDoctors();
            }

            renderDoctors(filteredDoctors = null) {
                const doctorsGrid = document.getElementById('doctors-grid');
                const doctorsToRender = filteredDoctors || this.doctors;

                doctorsGrid.innerHTML = doctorsToRender.map(doctor => `
                    <div class="doctor-card" data-id="${doctor.id}">
                        <b></b>
                        <img src="${doctor.image}" alt="${doctor.name}">
                        <div class="content">
                            <p class="title">${doctor.name}<br><span>${doctor.specialtyName}</span></p>
                            <div class="doctor-info">
                                <div class="info-item">
                                    <strong>${doctor.experience}</strong>
                                    <span>Experiencia</span>
                                </div>
                                <div class="info-item">
                                    <strong>${doctor.rating}</strong>
                                    <span>Calificación</span>
                                </div>
                                <div class="info-item">
                                    <strong>$${doctor.price}</strong>
                                    <span>Consulta</span>
                                </div>
                            </div>
                            <p class="doctor-description">${doctor.description}</p>
                            <button class="book-btn" data-id="${doctor.id}">Agendar Cita</button>
                        </div>
                    </div>
                `).join('');

                // Agregar event listeners a los botones
                document.querySelectorAll('.book-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const doctorId = parseInt(e.target.getAttribute('data-id'));
                        this.selectDoctor(doctorId);
                    });
                });
            }

            selectDoctor(doctorId) {
                this.selectedDoctor = this.doctors.find(d => d.id === doctorId);
                this.openBookingModal();
            }

            // ===== MODAL DE AGENDAMIENTO =====
            openBookingModal() {
                const modal = document.getElementById('booking-modal');
                const doctorName = document.getElementById('modal-doctor-name');
                const doctorAvatar = document.getElementById('modal-doctor-avatar');
                const doctorSpecialty = document.getElementById('modal-doctor-specialty');
                const doctorExperience = document.getElementById('modal-doctor-experience');
                const doctorClinic = document.getElementById('modal-doctor-clinic');

                doctorName.textContent = this.selectedDoctor.name;
                doctorAvatar.textContent = this.selectedDoctor.avatar;
                doctorSpecialty.textContent = this.selectedDoctor.specialtyName;
                doctorExperience.textContent = this.selectedDoctor.experience;
                doctorClinic.textContent = this.selectedDoctor.clinic;

                modal.style.display = 'flex';
                this.resetBookingSteps();
            }

            resetBookingSteps() {
                this.currentStep = 1;
                this.selectedDate = null;
                this.selectedTime = null;
                this.updateStepIndicator();
                this.renderCalendar();
            }

            updateStepIndicator() {
                document.querySelectorAll('.step-indicator .step').forEach(step => {
                    step.classList.remove('active');
                });
                document.querySelector(`.step-indicator .step[data-step="${this.currentStep}"]`).classList.add('active');

                document.querySelectorAll('.booking-step').forEach(step => {
                    step.classList.remove('active');
                });
                document.querySelector(`.booking-step[data-step="${this.currentStep}"]`).classList.add('active');

                // Mostrar/ocultar botones según el paso
                const prevBtn = document.getElementById('prev-step');
                const nextBtn = document.getElementById('next-step');
                const confirmBtn = document.getElementById('confirm-booking');

                prevBtn.style.display = this.currentStep > 1 ? 'inline-block' : 'none';
                nextBtn.style.display = this.currentStep < 3 ? 'inline-block' : 'none';
                confirmBtn.style.display = this.currentStep === 3 ? 'inline-block' : 'none';
            }

            // ===== CALENDARIO =====
            renderCalendar() {
                const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

                const currentMonthElement = document.getElementById('current-month');
                const calendarGrid = document.getElementById('calendar-days');

                const year = this.currentMonth.getFullYear();
                const month = this.currentMonth.getMonth();

                currentMonthElement.textContent = `${monthNames[month]} ${year}`;

                // Primer día del mes
                const firstDay = new Date(year, month, 1);
                // Último día del mes
                const lastDay = new Date(year, month + 1, 0);
                // Días en el mes
                const daysInMonth = lastDay.getDate();
                // Día de la semana del primer día (0 = Domingo, 1 = Lunes, ...)
                const startingDay = firstDay.getDay();

                calendarGrid.innerHTML = '';

                // Días de la semana
                const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
                weekdays.forEach(day => {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-weekday';
                    dayElement.textContent = day;
                    calendarGrid.appendChild(dayElement);
                });

                // Espacios vacíos antes del primer día
                for (let i = 0; i < startingDay; i++) {
                    const emptyElement = document.createElement('div');
                    emptyElement.className = 'calendar-day empty';
                    calendarGrid.appendChild(emptyElement);
                }

                // Días del mes
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Resetear horas para comparación

                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day';
                    dayElement.textContent = day;
                    
                    const currentDate = new Date(year, month, day);
                    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    dayElement.setAttribute('data-date', dateString);

                    // Deshabilitar días pasados
                    if (currentDate < today) {
                        dayElement.classList.add('disabled');
                    } else {
                        dayElement.addEventListener('click', () => this.selectDate(dayElement));
                    }

                    calendarGrid.appendChild(dayElement);
                }
            }

            selectDate(dayElement) {
                // Remover selección anterior
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });

                // Agregar selección actual
                dayElement.classList.add('selected');
                this.selectedDate = dayElement.getAttribute('data-date');
                
                // Generar horarios disponibles
                this.generateTimeSlots();
                
                // Avanzar al siguiente paso después de un delay
                setTimeout(() => {
                    this.nextStep();
                }, 500);
            }

            generateTimeSlots() {
                const timeSlotsContainer = document.getElementById('time-slots');
                const timeSlots = [
                    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
                    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
                    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
                ];

                timeSlotsContainer.innerHTML = timeSlots.map(time => `
                    <div class="time-slot" data-time="${time}">
                        ${time}
                    </div>
                `).join('');

                // Agregar event listeners
                document.querySelectorAll('.time-slot').forEach(slot => {
                    slot.addEventListener('click', (e) => {
                        document.querySelectorAll('.time-slot').forEach(s => {
                            s.classList.remove('selected');
                        });
                        e.target.classList.add('selected');
                        this.selectedTime = e.target.getAttribute('data-time');
                        
                        // Actualizar resumen
                        this.updateAppointmentSummary();
                        
                        setTimeout(() => {
                            this.nextStep();
                        }, 500);
                    });
                });
            }

            updateAppointmentSummary() {
                document.getElementById('summary-doctor').textContent = this.selectedDoctor.name;
                document.getElementById('summary-date').textContent = this.formatDate(this.selectedDate);
                document.getElementById('summary-time').textContent = this.selectedTime;
                document.getElementById('summary-price').textContent = `$${this.selectedDoctor.price}`;
            }

            formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }

            // ===== NAVEGACIÓN =====
            nextStep() {
                if (this.currentStep < 3) {
                    this.currentStep++;
                    this.updateStepIndicator();
                }
            }

            prevStep() {
                if (this.currentStep > 1) {
                    this.currentStep--;
                    this.updateStepIndicator();
                }
            }

            // ===== EVENT LISTENERS =====
            setupEventListeners() {
                // Navegación del modal
                document.getElementById('next-step').addEventListener('click', () => this.nextStep());
                document.getElementById('prev-step').addEventListener('click', () => this.prevStep());
                
                // Confirmar cita
                document.getElementById('confirm-booking').addEventListener('click', () => this.confirmAppointment());
                
                // Cerrar modal
                document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
                
                // Cambiar mes en calendario
                document.getElementById('prev-month').addEventListener('click', () => this.changeMonth(-1));
                document.getElementById('next-month').addEventListener('click', () => this.changeMonth(1));
                
                // Filtros de búsqueda
                document.getElementById('search-doctors').addEventListener('click', () => this.filterDoctors());
                
                // Cerrar modal haciendo clic fuera
                document.getElementById('booking-modal').addEventListener('click', (e) => {
                    if (e.target.id === 'booking-modal') {
                        this.closeModal();
                    }
                });
            }

            changeMonth(direction) {
                this.currentMonth.setMonth(this.currentMonth.getMonth() + direction);
                this.renderCalendar();
            }

            filterDoctors() {
                const specialty = document.getElementById('specialty-filter').value;
                const availability = document.getElementById('availability-filter').value;
                const experience = document.getElementById('experience-filter').value;

                let filteredDoctors = this.doctors;

                if (specialty !== 'all') {
                    filteredDoctors = filteredDoctors.filter(doctor => doctor.specialty === specialty);
                }

                if (experience !== 'all') {
                    const minExperience = parseInt(experience);
                    filteredDoctors = filteredDoctors.filter(doctor => {
                        const expYears = parseInt(doctor.experience);
                        return expYears >= minExperience;
                    });
                }

                this.renderDoctors(filteredDoctors);
            }

            // ===== CONFIRMACIÓN =====
            confirmAppointment() {
                const patientName = document.getElementById('patient-name').value;
                const patientEmail = document.getElementById('patient-email').value;
                const patientPhone = document.getElementById('patient-phone').value;

                if (!patientName || !patientEmail || !patientPhone) {
                    alert('Por favor completa todos los campos obligatorios');
                    return;
                }

                // Simular envío de datos
                const appointmentData = {
                    doctor: this.selectedDoctor.name,
                    specialty: this.selectedDoctor.specialtyName,
                    date: this.selectedDate,
                    time: this.selectedTime,
                    price: this.selectedDoctor.price,
                    patient: {
                        name: patientName,
                        email: patientEmail,
                        phone: patientPhone,
                        age: document.getElementById('patient-age').value,
                        reason: document.getElementById('patient-reason').value
                    }
                };

                console.log('Cita agendada:', appointmentData);
                
                // Mostrar confirmación
                alert(`¡Cita agendada exitosamente!\n\nMédico: ${this.selectedDoctor.name}\nFecha: ${this.formatDate(this.selectedDate)}\nHora: ${this.selectedTime}\nPrecio: $${this.selectedDoctor.price}\n\nTe hemos enviado un correo de confirmación.`);
                
                this.closeModal();
                
                // Redirigir a página principal después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }

            closeModal() {
                document.getElementById('booking-modal').style.display = 'none';
            }
        }

        // ===== INICIALIZACIÓN =====
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Inicializando página de agendación...');
            new AppointmentSystem();
        });
