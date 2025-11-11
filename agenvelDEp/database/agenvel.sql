-- Script SQL para la base de datos de AGENVEL
-- Versión: MySQL 8.0+ (compatible con Laragon en Windows)
-- Fecha: 2025-10-29
-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS agenvel;
USE agenvel;

-- Tabla: Roles
-- Define los roles de usuarios para control de acceso
CREATE TABLE Roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol ENUM('paciente', 'doctor', 'admin') NOT NULL
);

-- Tabla: Clinicas
-- Permite escalabilidad a múltiples clínicas/sedes
CREATE TABLE Clinicas (
    id_clinica INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    correo VARCHAR(255) UNIQUE
);

-- Tabla: Pacientes
-- Información de pacientes, con identificación única por cédula
CREATE TABLE Pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    direccion VARCHAR(255),
    contraseña VARCHAR(255) NOT NULL,  -- Encriptada (e.g., usando SHA-256 o bcrypt)
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Doctores
-- Información de doctores, vinculada a clínica para escalabilidad
CREATE TABLE Doctores (
    id_doctor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    id_clinica INT NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_fin TIME NOT NULL,
    contraseña VARCHAR(255) NOT NULL,  -- Encriptada
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    FOREIGN KEY (id_clinica) REFERENCES Clinicas(id_clinica)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Usuarios
-- Autenticación centralizada, vincula a roles y entidades específicas
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    id_paciente INT NULL,
    id_doctor INT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,  -- Encriptada
    ultimo_login DATETIME NULL,
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_paciente) REFERENCES Pacientes(id_paciente)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_doctor) REFERENCES Doctores(id_doctor)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Citas
-- Registro de citas médicas con restricciones de unicidad
CREATE TABLE Citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_doctor INT NOT NULL,
    id_clinica INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT,
    estado ENUM('pendiente', 'confirmada', 'completada', 'cancelada') DEFAULT 'pendiente',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paciente) REFERENCES Pacientes(id_paciente)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_doctor) REFERENCES Doctores(id_doctor)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_clinica) REFERENCES Clinicas(id_clinica)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Índices y restricciones únicas para optimización y reglas de negocio
-- Evitar citas duplicadas para doctor en mismo horario
ALTER TABLE Citas ADD UNIQUE INDEX idx_doctor_fecha_hora (id_doctor, fecha, hora);

-- Evitar que paciente agende dos citas con mismo doctor en mismo turno
ALTER TABLE Citas ADD UNIQUE INDEX idx_paciente_doctor_fecha_hora (id_paciente, id_doctor, fecha, hora);

-- Índices compuestos para consultas frecuentes (e.g., reportes por fecha, doctor)
CREATE INDEX idx_citas_fecha ON Citas (fecha);
CREATE INDEX idx_citas_id_doctor ON Citas (id_doctor);
CREATE INDEX idx_citas_estado ON Citas (estado);

-- Procedimiento almacenado: verificar_disponibilidad_doctor
-- Valida si un doctor tiene disponibilidad en una fecha y hora específicas
DELIMITER //
CREATE PROCEDURE verificar_disponibilidad_doctor(
    IN p_id_doctor INT,
    IN p_fecha DATE,
    IN p_hora TIME
)
BEGIN
    DECLARE v_count INT;
    DECLARE v_horario_inicio TIME;
    DECLARE v_horario_fin TIME;
    DECLARE v_estado ENUM('activo', 'inactivo');

    -- Obtener horario y estado del doctor
    SELECT horario_inicio, horario_fin, estado
    INTO v_horario_inicio, v_horario_fin, v_estado
    FROM Doctores
    WHERE id_doctor = p_id_doctor;

    -- Verificar si el doctor está activo
    IF v_estado != 'activo' THEN
        SELECT 0 AS disponible;  -- No disponible si inactivo
    ELSE
        -- Verificar si la hora está dentro del horario
        IF p_hora < v_horario_inicio OR p_hora > v_horario_fin THEN
            SELECT 0 AS disponible;  -- Fuera de horario
        ELSE
            -- Verificar si ya hay una cita en ese slot
            SELECT COUNT(*) INTO v_count
            FROM Citas
            WHERE id_doctor = p_id_doctor
            AND fecha = p_fecha
            AND hora = p_hora;

            IF v_count > 0 THEN
                SELECT 0 AS disponible;  -- Slot ocupado
            ELSE
                SELECT 1 AS disponible;  -- Disponible
            END IF;
        END IF;
    END IF;
END //
DELIMITER ;

-- Vista: vista_citas_detalladas
-- Une datos de citas con pacientes, doctores y clínicas para reportes
CREATE VIEW vista_citas_detalladas AS
SELECT 
    c.id_cita,
    c.fecha,
    c.hora,
    c.motivo,
    c.estado,
    p.nombre_completo AS paciente_nombre,
    p.cedula AS paciente_cedula,
    d.nombre_completo AS doctor_nombre,
    d.especialidad AS doctor_especialidad,
    cl.nombre AS clinica_nombre,
    cl.direccion AS clinica_direccion
FROM Citas c
INNER JOIN Pacientes p ON c.id_paciente = p.id_paciente
INNER JOIN Doctores d ON c.id_doctor = d.id_doctor
INNER JOIN Clinicas cl ON c.id_clinica = cl.id_clinica;

-- Datos iniciales de ejemplo (opcional, para testing en Laragon)
-- Insertar roles predeterminados
INSERT INTO Roles (nombre_rol) VALUES ('paciente'), ('doctor'), ('admin');

-- Insertar una clínica inicial
INSERT INTO Clinicas (nombre, direccion, telefono, correo) VALUES ('Clínica Principal', 'Calle Ficticia 123', '123456789', 'info@clinica.com');