-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2024 at 06:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seo`
--

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `root_id` int(11) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `root_id`, `question`, `answer`, `status`) VALUES
(1, NULL, 'General Information', NULL, 1),
(2, NULL, 'Products', NULL, 1),
(3, NULL, 'Ordering and Shipping', NULL, 1),
(4, NULL, 'Customer Service', NULL, 1),
(5, NULL, 'Returns Policy', NULL, 1),
(6, 1, 'What types of products does National Plastic Industries Ltd offer?', 'We offer a wide range of household products, including, Various types of Chairs, storage solutions, Tables, Stools, Drawer, and Much household product designed for durability and comfort.', 1),
(7, 1, 'Where is National Plastic Industries Ltd located?', 'Our headquarters is located in Mumbai, India. We have manufacturing facilities across the country (Silvassa, Patna, Nellore) to serve our customers efficiently.', 1),
(8, 2, 'Are your products environmentally friendly?', 'Yes, we are committed to sustainability. Our products are made from recyclable materials, and we continuously strive to minimize our environmental impact.', 1),
(9, 2, 'Do you customize plastic furniture according to specific requirements?', 'Yes, we offer customization options for plastic furniture to meet your specific needs and preferences.', 1),
(10, 2, 'Do you have a catalogue of your products?', 'Yes, we provide a comprehensive catalogue showcasing our full range of products. You can request a copy through our website or customer service.', 1),
(11, 2, 'Can I purchase products directly from your website?', 'Yes, our website offers a user-friendly shopping experience where you can browse and purchase our products directly.', 1),
(12, 2, 'Do you offer bulk purchasing options?', 'Yes, we cater to wholesalers and bulk buyers. Please contact our sales team for special pricing and availability.', 1),
(13, 2, 'What is the warranty on your products?', 'We offer a 1 Year warranty on many of our products. The specific terms can vary, so please check the product details or contact customer service for more information.', 1),
(14, 2, 'How can I clean and maintain my plastic products?', 'Most of our products are easy to clean with mild soap and water. Avoid harsh chemicals that can damage the surface. For specific care instructions, refer to the product label.', 1),
(15, 3, 'How can I place an order?', 'You can place an order through our website, or by contacting our sales team directly via phone or email.', 1),
(16, 3, 'What are the shipping options?', 'We offer various shipping options to ensure timely delivery. Shipping costs and delivery times will vary based on your location and the size of the order.', 1),
(17, 3, 'Can I track my order?', 'Yes, once your order is shipped, we will provide you with a tracking number so you can monitor its progress.', 1),
(18, 3, 'Do you ship internationally?', 'Yes, we offer international shipping. Shipping costs and times may vary based on location. Please contact us for specific details.', 1),
(19, 4, 'How can I contact customer service?', 'You can reach our customer service team via email at info@nationalplastic.com or by calling +91-2267669999 We are here to assist you!', 1),
(20, 4, 'What should I do if I receive a damaged product?', 'If you receive a damaged product, please contact our customer service within 7 days of delivery. We will guide you through the return process and provide a replacement if applicable.', 1),
(21, 4, 'How can I stay updated on new products and promotions?', 'You can subscribe to our newsletter on our website to receive updates and also follow us on social media (Facebook, Instagram, LinkedIn, Twitter, Pinterest and YouTube) for new products, promotions, and special offers.', 1),
(22, 5, 'What is your return policy?', 'We accept returns within 30 days of purchase for unopened and unused products. Please refer to our return policy for complete details.', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_root_id` (`root_id`),
  ADD KEY `idx_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
