-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 21, 2024 at 06:07 AM
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
-- Table structure for table `outcomes`
--

CREATE TABLE `outcomes` (
  `ad_id` int NOT NULL,
  `years` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `file_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `outcomes`
--

INSERT INTO `outcomes` (`ad_id`, `years`, `title`, `file_name`, `status`) VALUES
(2, '2024-2025', 'Outcome of Board Meeting 21st May 2024', 'BSE%20Upload-3-13_merged.pdf', 1),
(3, '2023-2024', 'Outcome of Board Meeting 12th February 2024', 'BSE%20Upload(15).pdf', 1),
(4, '2023-2024', 'Outcome of Board Meeting 9th November 2023', 'BSE%20Upload(8).pdf', 1),
(5, '2023-2024', 'Outcome of Board Meeting 11th August 2023', 'BSE%20Upload(3).pdf', 1),
(6, '2023-2024', 'Outcome of Board Meeting 26th May 2023', 'Outcome%20of%20Board%20Meeting%2026th%20May%202023(2).pdf', 1),
(7, '2022-2023', 'Outcome of Board Meeting 13th February 2023', 'Outcome%20of%20Board%20Meeting%20February%2013,%202023.pdf', 1),
(8, '2022-2023', 'Outcome of Board Meeting 28th May 2022', 'Outcome%20of%20Board%20Meeting%2028th%20May%202022.pdf', 1),
(9, '2022-2023', 'Outcome of Board Meeting 11th August 2022', 'Outcome%20of%20Board%20Meeting%20August%2011,%202022.pdf', 1),
(10, '2022-2023', 'Outcome of Board Meeting 14th November 2022', 'Outcome%20of%20Board%20Meeting%20November%2014,%202022.pdf', 1),
(11, '2021-2022', 'Outcome of Board Meeting 14th February 2022', 'Outcome%20of%20Board%20Meeting%2014th%20February%202022.pdf', 1),
(12, '2021-2022', 'Outcome of Board Meeting 11th Nov 2021', 'Outcome%20of%20Board%20Meeting%2011th%20Nov%202021.pdf', 1),
(13, '2021-2022', 'Outcome of Board Meeting 11th Aug 2021', 'Outcome%20of%20Board%20Meeting%20-%2011th%20Aug.%202021.pdf', 1),
(14, '2021-2022', 'Outcome of the Board Meeting 10th June 2021', 'Outcome%20of%20the%20Board%20Meeting%20-%2010th%20June%202021(2).pdf', 1),
(15, '2020-2021', 'Outcome of Board Meeting 12th Feb 2020', 'Outcome%20Board%20Mtg-11%20Nov%202019.pdf', 1),
(16, '2020-2021', 'Outcome of Board Meeting 12 Nov 2020', 'Outcome%20Board%20Mtg-11%20Nov%202019.pdf', 1),
(17, '2020-2021', 'Outcome of Board Meeting 12th Aug 2020', 'Outcome%20Board%20Mtg-11%20Nov%202019.pdf', 1),
(18, '2020-2021', 'Outcome of Board Meeting 30th june 2020', 'Outcome%20Board%20Mtg-11%20Nov%202019.pdf', 1),
(19, '2019-2020', 'Outcome of Board Meeting -11 nov 2019', 'Outcome%20Board%20Mtg-11%20Nov%202019.pdf', 1),
(20, '2019-2020', 'Outcome of Board Meeting - 20 May 2019', 'Outcome-of-BM_20.5.2019.pdf', 1),
(21, '2019-2020', 'Outcome of Board Meeting-12-Aug-2019', 'Outcome%20of%20Board%20Meeting%20-%2012.08.2019.pdf', 1),
(22, '2019-2020', 'Outcome of Board Meeting-05-Feb-2020', 'Outcome%20of%20Board%20Meeting%20on%2005.02.2020.pdf', 1),
(23, '2018-2019', 'Outcome of Board Meeting - 07 February 2019', 'outcome-of-meeting-7-feb-2019.pdf', 1),
(24, '2018-2019', 'Outcome of Board Meeting - 13 November 2018', 'Outcome-of-Board-Meeting_30_Nov_2018.pdf', 1),
(25, '2018-2019', 'Outcome of Board Meeting - 29 May 2018', 'Outcome-of-Board-Meeting-29.05.2018.pdf', 1),
(26, '2018-2019', 'Outcome of Board Meeting - 03 August 2018', 'Outcome-of-the-BM-03-aug-18.pdf', 1),
(27, 'Testing ', 'l', '/Assets/uploads/Investors/invoice-1021 (1).pdf', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `outcomes`
--
ALTER TABLE `outcomes`
  ADD PRIMARY KEY (`ad_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `outcomes`
--
ALTER TABLE `outcomes`
  MODIFY `ad_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
