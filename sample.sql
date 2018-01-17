-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2018 at 08:16 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sample`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_corporate`
--

CREATE TABLE `tbl_corporate` (
  `acc_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `contactno` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `departmentcount` int(11) NOT NULL,
  `language` varchar(255) NOT NULL,
  `otl` varchar(255) NOT NULL,
  `courses` varchar(255) NOT NULL,
  `classreq` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_individual`
--

CREATE TABLE `tbl_individual` (
  `acc_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthday` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `contactno` varchar(255) NOT NULL,
  `civilstatus` varchar(255) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `otlanguage` varchar(255) NOT NULL,
  `courses` varchar(255) NOT NULL,
  `classreq` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_level` varchar(255) NOT NULL,
  `account_type` varchar(255) NOT NULL,
  `verification_code` varchar(255) NOT NULL,
  `user_status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `passwordResetAttempt` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `username`, `user_email`, `user_password`, `user_level`, `account_type`, `verification_code`, `user_status`, `createdAt`, `passwordResetAttempt`) VALUES
(2, 'asdasdasd', 'a', 'asdasd', 'Learner', 'Individual', 'ac2460b56866901d732f996b82b69d31', 0, '2018-01-08 15:57:17', 0),
(3, 'asdasdasd', 'asdasd', 'asdasdasd', 'Learner', 'Individual', '1def1713ebf17722cbe300cfc1c88558', 0, '2018-01-08 15:58:53', 0),
(4, 'asdasds', 'asdasds', 'asdasd', 'Learner', 'Individual', '0731460a8a5ce1626210cbf4385ae0ef', 0, '2018-01-09 16:01:34', 0),
(5, 'dassdasd', 'sadads', 'asdasdasd', 'Learner', 'Individual', 'fed537780f3f29cc5d5f313bbda423c4', 0, '2018-01-09 16:02:29', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_corporate`
--
ALTER TABLE `tbl_corporate`
  ADD PRIMARY KEY (`acc_id`);

--
-- Indexes for table `tbl_individual`
--
ALTER TABLE `tbl_individual`
  ADD PRIMARY KEY (`acc_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_corporate`
--
ALTER TABLE `tbl_corporate`
  MODIFY `acc_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_individual`
--
ALTER TABLE `tbl_individual`
  MODIFY `acc_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_corporate`
--
ALTER TABLE `tbl_corporate`
  ADD CONSTRAINT `acc_corp` FOREIGN KEY (`acc_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_individual`
--
ALTER TABLE `tbl_individual`
  ADD CONSTRAINT `acc_indiv` FOREIGN KEY (`acc_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
