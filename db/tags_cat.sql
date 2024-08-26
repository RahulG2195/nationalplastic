-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 26, 2024 at 08:57 AM
-- Server version: 8.0.39
-- PHP Version: 8.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `labindia123_national`
--

-- --------------------------------------------------------

--
-- Table structure for table `tags_cat`
--

CREATE TABLE `tags_cat` (
  `tag_id` int NOT NULL,
  `tag_seo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tag_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tag_sub_banner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tag_image` text COLLATE utf8mb4_general_ci NOT NULL,
  `tag_status` int NOT NULL DEFAULT '1',
  `added_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags_cat`
--

INSERT INTO `tags_cat` (`tag_id`, `tag_seo`, `tag_name`, `tag_sub_banner`, `tag_image`, `tag_status`, `added_on`) VALUES
(1, 'Living-Room', 'Living Room', '', 'Living-Room.png', 1, '2024-08-23 05:02:19'),
(2, 'Baby-Room', 'Baby Room', '', 'Kids-Room.png', 1, '2024-08-23 05:02:19'),
(3, 'Store-Room', 'Store Room', '', 'Store-Room.png', 1, '2024-08-23 05:04:43'),
(4, 'Bedroom', 'Bedroom', '', 'Bedroom.png', 1, '2024-08-23 05:04:43'),
(5, 'Dining-Room', 'Dining Room', '', 'Dining-Room.png', 1, '2024-08-23 09:23:35'),
(6, 'Balcony', 'Balcony', '', 'Balcony-Room.png', 1, '2024-08-23 09:23:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tags_cat`
--
ALTER TABLE `tags_cat`
  ADD PRIMARY KEY (`tag_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tags_cat`
--
ALTER TABLE `tags_cat`
  MODIFY `tag_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
