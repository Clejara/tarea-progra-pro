
--Cree nueva BD en cliente de PG Admin y correr el siguiente script utilizando Query tool, luego edite el archivo index.js en esta misma carpeta

CREATE TABLE Pacientes (
    rut VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    direccion VARCHAR(20),
    telefono NUMERIC
);

CREATE TABLE Consultas (
    codigo SERIAL PRIMARY KEY,
    fechaConsulta VARCHAR(10) NOT NULL,
    horaConsulta VARCHAR(5) NOT NULL,
    medico_tratante VARCHAR(20),
    nro_clinica NUMERIC,
    rut VARCHAR(10),
    CONSTRAINT fk_rut
        FOREIGN KEY(rut) 
        REFERENCES Pacientes(rut)
);

INSERT INTO Pacientes (rut, nombre, direccion, telefono) VALUES
('1234567890', 'Juan Perez', 'Calle Falsa 123', 987654321),
('0987654321', 'Maria Lopez', 'Av. Siempre Viva 742', 123456789),
('1122334455', 'Carlos Sanchez', 'Bvd. Sueños 456', 987123456),
('5566778899', 'Ana Martinez', 'Plaza Mayor 789', 321654987),
('6677889900', 'Jose Gomez', 'Calle Luna 321', 654987321);


INSERT INTO Consultas (fechaConsulta, horaConsulta, medico_tratante, nro_clinica, rut) VALUES
('2024-06-01', '10:00', 'Dr. Smith', 1, '1234567890'),
('2024-06-02', '11:00', 'Dr. Johnson', 2, '0987654321'),
('2024-06-03', '09:00', 'Dr. Brown', 1, '1122334455'),
('2024-06-04', '14:00', 'Dr. Garcia', 3, '5566778899'),
('2024-06-05', '15:00', 'Dr. Martinez', 2, '6677889900');
