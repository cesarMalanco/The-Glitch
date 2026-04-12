-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2026 at 07:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `the-glitch`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `price` decimal(12,4) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `brand`, `price`, `stock`, `image_url`, `description`) VALUES
(1, 'Minecraft Xbox 360', 'Videojuegos', 'Mojang Studios', 800.0000, 2, 'minecraft.jpg', 'El juego de construcción tipo \"sandbox\" más vendido de la historia. Explora mundos generados procedimentalmente, construye estructuras increíbles y sobrevive a las criaturas de la noche. Un lienzo infinito para la creatividad.'),
(2, 'Nintendo Switch – Modelo OLED', 'Consolas', 'Nintendo', 12500.0000, 15, 'switch-oled.png', 'Pantalla OLED de 7 pulgadas, soporte ancho ajustable y puerto LAN integrado en la base.'),
(3, 'DualSense Wireless Controller', 'Accesorios', 'Sony', 1500.0000, 45, 'dualsense-controller.png', 'Control inalámbrico con retroalimentación háptica y gatillos adaptables dinámicos.'),
(4, 'Xbox Game Pass Ultimate - 3 Meses', 'Suscripciones', 'Microsoft', 899.0000, 500, 'gamepass3-xbox.jpg', 'Código digital para acceso a cientos de juegos en consola, PC y nube, incluye EA Play.'),
(5, 'Figura Amiibo Link (Tears of the Kingdom)', 'Coleccionables', 'Nintendo', 699.0000, 0, 'amiibo-LinkTOTK.png', 'Figura interactiva para usar en juegos compatibles de Nintendo Switch.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
