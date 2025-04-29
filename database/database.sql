//Crear la base de datos
CREATE DATABASE control_actividades;
USE control_actividades;

//Tabla Usuario
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

//Tabla Actividad
CREATE TABLE Actividad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomActi VARCHAR(255) NOT NULL,
    descActi TEXT,
    fechaIni DATE NOT NULL,
    fechaFin DATE NOT NULL,
    prioridadActi VARCHAR(10) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    CONSTRAINT chk_fechas CHECK (fechaFin >= fechaIni) 
);

//Índices para mejorar el rendimiento
CREATE INDEX idx_usuario_id ON Actividad(usuario_id);
CREATE INDEX idx_prioridad ON Actividad(prioridadActi);


ALTER TABLE actividad 
ADD COLUMN estado ENUM('pendiente', 'no-realizada', 'terminada') 
DEFAULT 'pendiente' NOT NULL;
