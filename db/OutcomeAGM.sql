-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 14, 2024 at 10:10 AM
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
-- Table structure for table `OutcomeAGM`
--

CREATE TABLE `OutcomeAGM` (
  `id` int NOT NULL,
  `financial_year` varchar(9) COLLATE utf8mb4_general_ci NOT NULL,
  `notice_type` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `notice_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `OutcomeAGM`
--

INSERT INTO `OutcomeAGM` (`id`, `financial_year`, `notice_type`, `notice_title`, `file_path`) VALUES
(1, '2022-2023', 'Outcome of AGM', 'Outcome of AGM 21.08.2023.pdf', 'pdf/AGM%20proceeding_signed.pdf'),
(2, '2022-2023', 'Scrutinizer Report', 'Scrutinizer Report on E-voting.pdf', 'pdf/Signed_Scrutinizers_Report.pdf'),
(3, '2022-2023', 'Voting Results', 'Voting Results 22.08.2023.pdf', 'pdf/Results-%20AGM_signed.pdf'),
(4, '2021-2022', 'Outcome of AGM', 'Outcome of AGM 26.08.2022.pdf', 'pdf/Outcome%20of%20AGM%2026.08.2022.pdf'),
(5, '2021-2022', 'Scrutinizer Report', 'Scrutinizer Report on E-voting.pdf', 'pdf/Scrutinizer%20Report%20on%20E-voting(1).pdf'),
(6, '2021-2022', 'Voting Results', 'Voting Results 27.08.2022.pdf', 'pdf/Voting%20Results%2027.08.2022.pdf'),
(7, '2020-2021', 'Outcome of AGM', 'Outcome of AGM 30.07.2021.pdf', 'pdf/Outcome%20of%20AGM%2030.07.2021.pdf'),
(8, '2020-2021', 'Scrutinizer Report', 'Scrutinizer Report on E-voting.pdf', 'pdf/Scrutinizer%20Report%20on%20E-voting.pdf'),
(9, '2020-2021', 'Voting Results', 'Voting Results 30.07.2021.pdf', 'pdf/Voting%20Results%2030.07.2021.pdf'),
(10, '2019-2020', 'Outcome of AGM', 'Outcome of the Meeting 18.09.2020', 'pdf/Outcome(1).pdf'),
(11, '2019-2020', 'Scrutinizer Report', 'Scrutinizers Report Evoting National Plastic 2020', 'pdf/Scrutinizer%20report-%20Evoting%20National%20Plastic%202019%20(1).pdf'),
(12, '2019-2020', 'Voting Results', 'Voting Results 30.07.2021.pdf', 'pdf/Evoting-20-09-2019.html'),
(13, '2018-2019', 'Outcome of AGM', 'Outcome of the Meeting 20.09.2019', 'pdf/30th%20June,%202019.pdf'),
(14, '2018-2019', 'Scrutinizer Report', 'Scrutinizers Report Evoting National Plastic 2019', 'pdf/Scrutinizer%20report-%20Evoting%20National%20Plastic%202019%20(1).pdf'),
(15, '2018-2019', 'Voting Results', 'Voting Results 20.09.2019', 'pdf/Evoting-20-09-2019.html'),
(16, '2017-2018', 'Outcome of AGM', 'Outcome of the Meeting 19.09.2018', 'pdf/Outcome-of-the-Meeting-19.09.2018.pdf'),
(17, '2017-2018', 'Scrutinizer Report', 'Scrutinizers Report Evoting National Plastic 2018', 'pdf/Scrutinizers-Report-Evoting-National-Plastic-2018.pdf'),
(18, '2017-2018', 'Voting Results', 'Voting Results 20.09.2018', 'pdf/Voting-Result-2018.pdf'),
(19, '2016-2017', 'Outcome of AGM', 'Disclosure of Voting Results - Reg 44', 'pdf/AGM_Disclosure_of_Voting_Results_Reg-44_2016-17.pdf'),
(20, '2016-2017', 'Scrutinizer Report', 'Scrutinizers Report', 'pdf/Scrutinizers_Report_2016-17.pdf'),
(21, '2016-2017', 'Voting Results', 'Voting Results - 20.09.2017', 'pdf/AGM_Voting_Results_20.09.2017.pdf'),
(22, '2015-2016', 'Scrutinizer Report', 'Scrutinizers Report-Evoting-National Plastic-2016', 'pdf/Scrutinizers_Report_Evoting_National_Plastic-2015-16.pdf'),
(23, '2015-2016', 'Voting Results', 'Voting Results- 22.09.2016', 'pdf/AGM_Voting_Results_22.09.2016.pdf'),
(24, '2015-2016', 'Outcome of AGM', 'Disclosure of Voting Results - Reg 44', 'pdf/AGM_Disclosure_of_Voting_Results_Reg-44_2015-16.pdf'),
(25, '2014-2015', 'Outcome of AGM', 'Disclosure of Voting Results - Clause 35A', 'pdf/AGM_Disclosure_of_Voting_Results_Clause-35A_2014-15.pdf'),
(26, '2014-2015', 'Voting Results', 'Voting Result - 29.09.2015', 'pdf/Outcome_of_AGM_Voting_Result_29.09.2015.pdf'),
(27, '2014-2015', 'Scrutinizer Report', 'Scrutinizers Report(E-voting & Ballot)', 'pdf/Scrutinizers_Report_Evoting_National_Plastic-2014-15.pdf'),
(28, '2013-2014', 'Voting Results', 'Voting Result - 11.09.2014', 'pdf/AGM_Voting_Result_11.09.2014.pdf'),
(29, '2013-2014', 'Scrutinizer Report', 'Scrutinizers Report (E-voting & Poll) - 11.09.2014', 'pdf/Scrutinizers_Report_Evoting_National_Plastic-2013-14.pdf'),
(30, '2013-2014', 'Outcome of AGM', 'Disclosure of Voting Results - Clause 35A', 'pdf/AGM_Disclosure_of_Voting_Results_Clause-35A_2013-14.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `OutcomeAGM`
--
ALTER TABLE `OutcomeAGM`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `OutcomeAGM`
--
ALTER TABLE `OutcomeAGM`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
