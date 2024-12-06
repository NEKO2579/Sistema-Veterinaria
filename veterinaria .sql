-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-10-2024 a las 19:25:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `b13_37772430_veterinaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancellation_history`
--

CREATE TABLE `cancellation_history` (
  `cancellation_id` int(11) UNSIGNED NOT NULL,
  `appointment_id` int(11) UNSIGNED NOT NULL,
  `cancellation_reason` text NOT NULL,
  `cancellation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `cancelled_by` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) UNSIGNED NOT NULL,
  `contact_phone` varchar(20) NOT NULL,
  `contact_address` varchar(255) NOT NULL,
  `appointment_reason` enum('consultar pedido','realizar pedido','Informe de mi mascota') NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `additional_field` varchar(255) DEFAULT NULL,
  `Paciente_ID` int(11) NOT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `Id_Paciente` int(11) NOT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `Nombre_Animal` varchar(15) NOT NULL,
  `Tipo_Animal` varchar(25) NOT NULL,
  `Raza_Animal` varchar(25) NOT NULL,
  `Peso_Animal` float NOT NULL,
  `Edad_Animal` int(11) NOT NULL,
  `Altura_animal` int(11) NOT NULL,
  `Dueño` int(11) UNSIGNED NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `edad` int(3) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `T_Identificacion` enum('Tarjeta De Identidad','Cedula De Extranjeria','Tarjeta De Extranjeria','Cedula De Ciudadania','Documento Nacional') NOT NULL,
  `N_identificacion` varchar(12) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `T_Genero` enum('HOMBRE','MUJER','NO_BINARIO','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cancellation_history`
--
ALTER TABLE `cancellation_history`
  ADD PRIMARY KEY (`cancellation_id`),
  ADD KEY `appointment_id` (`appointment_id`),
  ADD KEY `cancelled_by` (`cancelled_by`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `Paciente_ID_Cita` (`Paciente_ID`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`Id_Paciente`),
  ADD KEY ` Nombre_Dueño` (`Dueño`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cancellation_history`
--
ALTER TABLE `cancellation_history`
  MODIFY `cancellation_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `Id_Paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cancellation_history`
--
ALTER TABLE `cancellation_history`
  ADD CONSTRAINT `cancellation_history_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `citas` (`id`),
  ADD CONSTRAINT `cancellation_history_ibfk_2` FOREIGN KEY (`cancelled_by`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `Paciente_ID_Cita` FOREIGN KEY (`Paciente_ID`) REFERENCES `pacientes` (`Id_Paciente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT ` Nombre_Dueño` FOREIGN KEY (`Dueño`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
