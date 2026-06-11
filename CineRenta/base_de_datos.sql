

CREATE TABLE IF NOT EXISTS solicitudes (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(150) NOT NULL,
    edad        INT NOT NULL,
    direccion   VARCHAR(255) NOT NULL,
    sexo        VARCHAR(20) NOT NULL,
    peliculas   TEXT NOT NULL,
    fecha       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
