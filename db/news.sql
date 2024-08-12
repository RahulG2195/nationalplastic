-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 12, 2024 at 07:33 AM
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
-- Table structure for table `news_media`
--

CREATE TABLE `news_media` (
  `id` int NOT NULL,
  `heading` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `subheading` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `images` text COLLATE utf8mb4_general_ci,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('published','draft','archived') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_media`
--

INSERT INTO `news_media` (`id`, `heading`, `subheading`, `images`, `created_on`, `status`) VALUES
(1, 'Events & Activities', 'Stay tuned for latest updates and upcoming events!', 'https://picsum.photos/539/354,https://picsum.photos/539/354,https://picsum.photos/539/354,https://picsum.photos/539/354,https://picsum.photos/539/354,https://picsum.photos/539/354', '2024-07-24 09:57:29', 'published');

--
-- Triggers `news_media`
--
DELIMITER $$
CREATE TRIGGER `clean_images_column` BEFORE UPDATE ON `news_media` FOR EACH ROW BEGIN
    SET NEW.images = TRIM(BOTH ',' FROM REPLACE(REPLACE(NEW.images, ' ', ''), ',,', ','));
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news_media`
--
ALTER TABLE `news_media`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news_media`
--
ALTER TABLE `news_media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
