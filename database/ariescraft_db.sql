-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 22, 2022 at 11:39 AM
-- Server version: 10.3.36-MariaDB-cll-lve
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ariescraft_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `email`, `password`, `created`) VALUES
(10, 'makhan', 'tarade', 'admin@gmail.com', 'admin', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `complete_project`
--

CREATE TABLE `complete_project` (
  `id` int(20) NOT NULL,
  `cpid` varchar(250) DEFAULT NULL,
  `product_id` varchar(100) NOT NULL,
  `additional_info` varchar(100) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `service` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `client_id` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `created` timestamp(6) NULL DEFAULT current_timestamp(6),
  `order_id` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `complete_project`
--

INSERT INTO `complete_project` (`id`, `cpid`, `product_id`, `additional_info`, `attachment`, `user_id`, `service`, `status`, `client_id`, `user_name`, `created`, `order_id`) VALUES
(2015, '2019246546', '190000', 'vfsv', NULL, '14', 'artwork', 'Completed', '40', 'makhan tarade', '2022-01-27 08:17:51.846401', 'AW190000'),
(2017, '190000246546', '190000', 'Multifile', NULL, '14', 'artwork', 'Completed', '40', 'makhan', '2022-02-23 13:04:56.315100', 'AW190000'),
(2018, '190000246546', '190000', 'Multifile', NULL, NULL, 'artwork', 'Completed', '40', NULL, '2022-02-23 13:05:07.259320', 'AW190000'),
(2019, '190000246546', '190000', 'up', NULL, '14', 'artwork', 'Completed', '40', 'makhan', '2022-02-23 13:05:33.829837', 'AW190000'),
(2020, '190000246546', '190000', 'multi', NULL, '14', 'artwork', 'Completed', '40', 'makhan', '2022-02-23 13:06:29.660319', 'AW190000'),
(2021, '190000246546', '190000', 'fgg', NULL, '14', 'artwork', 'Completed', '40', 'makhan', '2022-02-23 13:09:20.071123', 'AW190000'),
(2022, '190000246546', '190000', 'fgg', NULL, NULL, 'artwork', 'Completed', '40', NULL, '2022-02-23 13:09:21.127383', 'AW190000'),
(2023, '190000246546', '190000', 'fgg', NULL, NULL, 'artwork', 'Completed', '40', NULL, '2022-02-23 13:09:22.280801', 'AW190000'),
(2024, '190000246546', '190000', '', NULL, '14', 'artwork', 'Completed', '40', 'makhan', '2022-02-23 14:12:55.203177', 'AW190000'),
(2025, '190013246546', '190013', 'Upload', NULL, '14', 'artwork', 'Completed', '50', 'makhan', '2022-02-23 14:31:14.737341', 'AW190013'),
(2026, '190013246546', '190013', 'Upload', NULL, '14', 'artwork', 'Completed', '50', 'makhan', '2022-02-23 14:32:23.375008', 'AW190013'),
(2027, '190013246546', '190013', 'sf', NULL, '14', 'artwork', 'Completed', '50', 'makhan', '2022-03-14 07:30:58.686346', 'AW190013'),
(2028, '190013246546', '190013', 'mm', NULL, '14', 'artwork', 'Completed', '50', 'makhan', '2022-03-14 07:36:47.378398', 'AW190013'),
(2029, '190013246546', '190013', 'mm', NULL, NULL, 'artwork', 'Completed', '50', NULL, '2022-03-14 07:36:48.952343', 'AW190013'),
(2030, '190013246546', '190013', 'mm', NULL, NULL, 'artwork', 'Completed', '50', NULL, '2022-03-14 07:38:01.077593', 'AW190013'),
(2031, '190013246546', '190013', 'nmn', NULL, '14', 'artwork', 'Completed', '50', 'makhan', '2022-03-14 07:38:30.738645', 'AW190013');

-- --------------------------------------------------------

--
-- Table structure for table `mupload`
--

CREATE TABLE `mupload` (
  `id` int(10) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `order_id` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mupload`
--

INSERT INTO `mupload` (`id`, `file_name`, `order_id`) VALUES
(193, 'Professional Examination Board.pdf', '190000'),
(194, 'users.sql', '190000'),
(213, 'Reese.jpg', '190013'),
(214, 'Road Works logo.jpg', '190013');

-- --------------------------------------------------------

--
-- Table structure for table `pmupload`
--

CREATE TABLE `pmupload` (
  `id` int(20) NOT NULL,
  `cpid` varchar(250) DEFAULT NULL,
  `order_id` varchar(250) DEFAULT NULL,
  `file_name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pmupload`
--

INSERT INTO `pmupload` (`id`, `cpid`, `order_id`, `file_name`) VALUES
(18, '2017246546', '2017', 'ariescraft_db.sql'),
(19, '2017246546', '2017', 'Professional Examination Board.pdf'),
(20, '190002246546', '190002', '649.jpg'),
(21, '190002246546', '190002', 'art-gec460f1fb_1280.jpg'),
(22, '190002246546', '190002', 'free-vector-graphics-jan-13.jpg'),
(23, '190002246546', '190002', 'free-vector-graphics-jan-23.jpg'),
(24, '190000246546', '190000', 'Capture.JPG'),
(25, '190000246546', '190000', 'HL Jewels.jpg'),
(26, '190000246546', '190000', 'Capture.JPG'),
(27, '190000246546', '190000', 'HL Jewels.jpg'),
(28, '190000246546', '190000', 'Capture.JPG'),
(29, '190000246546', '190000', 'HL Jewels.jpg'),
(30, '190000246546', '190000', 'Capture.JPG'),
(31, '190000246546', '190000', 'HL Jewels.jpg'),
(32, '190000246546', '190000', 'AW170766.eps'),
(33, '190000246546', '190000', 'AW170766.pdf'),
(34, '190000246546', '190000', 'AW170766.ai'),
(35, '190000246546', '190000', 'AW170766.jpg'),
(36, '190013246546', '190013', 'AW170766.eps'),
(37, '190013246546', '190013', 'AW170766.pdf'),
(38, '190013246546', '190013', 'AW170766.ai'),
(39, '190013246546', '190013', 'AW170766.jpg'),
(40, '190013246546', '190013', 'AW170766.eps'),
(41, '190013246546', '190013', 'AW170766.pdf'),
(42, '190013246546', '190013', 'AW170766.ai'),
(43, '190013246546', '190013', 'AW170766.jpg'),
(44, '190013246546', '190013', '2021.png'),
(45, '190013246546', '190013', 'new-year-2021-4801925_960_720.png'),
(46, '190013246546', '190013', '2021.png'),
(47, '190013246546', '190013', 'new-year-2021-4801925_960_720.png'),
(48, '190013246546', '190013', '2021.png'),
(49, '190013246546', '190013', 'new-year-2021-4801925_960_720.png'),
(50, '190013246546', '190013', '2021.png'),
(51, '190013246546', '190013', 'new-year-2021-4801925_960_720.png');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_edit`
--

CREATE TABLE `portfolio_edit` (
  `id` int(10) UNSIGNED NOT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `body` varchar(255) DEFAULT NULL,
  `services` varchar(255) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `portfolio_edit`
--

INSERT INTO `portfolio_edit` (`id`, `heading`, `body`, `services`, `image_name`) VALUES
(29, 'Vector Artwork', 'AC Vector Artwork', 'Vector_Artwork', '/portfolio/Art Sample 2.png'),
(30, 'Vector Artwork', 'AC Vector Artwork', 'Vector_Artwork', '/portfolio/Art Sample 17.png'),
(31, 'Embroidery Digitizing', 'AC Digitizing', 'Embroidery_Digitizing', '/portfolio/Emb Sample 1.png'),
(32, 'Embroidery Digitizing', 'AC Digitizing', 'Embroidery_Digitizing', '/portfolio/Emb Sample 7.png'),
(33, 'Embroidery Digitizing', 'AC Digitizing', 'Embroidery_Digitizing', '/portfolio/Emb Sample 5.png'),
(38, 'Vector_Artwork', 'AC Vector Artwork ', 'Vector_Artwork', '/portfolio/Art Sample 10.png'),
(39, 'Embroidery_Digitizing ', 'AC Digitizing', 'Embroidery_Digitizing', '/portfolio/Emb Sample 2.png'),
(47, 'Vector_Artwork', 'AC Vector Artwork ', 'Vector_Artwork', '/portfolio/Art Sample 3.png'),
(48, 'Vector_Artwork', 'AC Vector Artwork ', 'Vector_Artwork', '/portfolio/Art Sample 5.png'),
(49, 'Vector_Artwork', 'AC Vector Artwork ', 'Vector_Artwork', '/portfolio/Art Sample 13.png'),
(50, 'Vector_Artwork', 'AC Vector Artwork ', 'Vector_Artwork', '/portfolio/Art Sample 15.png'),
(51, 'Vector_Artwork', 'AC Vector Artwork ', 'Vector_Artwork', '/portfolio/Art Sample 18.png'),
(52, 'Embroidery Digitizing ', 'AC Digitizing', 'Embroidery_Digitizing', '/portfolio/Emb Sample 3.png'),
(53, 'Embroidery Digitizing ', 'AC Digitizing', 'Embroidery_Digitizing', '/portfolio/Emb Sample 4.png'),
(54, 'Embroidery Digitizing ', 'AC Digitizing', 'Embroidery_Digitizing', '/portfolio/Emb Sample 6.png'),
(55, 'Embroidery Digitizing ', 'AC Digitizing', 'Embroidery_Digitizing', '/portfolio/Emb Sample 8.png');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(20) NOT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  `product_type` varchar(20) DEFAULT NULL,
  `order_type` varchar(100) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `format_type` varchar(100) DEFAULT NULL,
  `use_for` varchar(100) DEFAULT NULL,
  `additional_info` varchar(500) DEFAULT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `placement` varchar(100) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `assign_id` varchar(100) DEFAULT NULL,
  `assign_name` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `text` varchar(10) DEFAULT NULL,
  `btn_pen` varchar(100) DEFAULT NULL,
  `btn_up` varchar(100) DEFAULT NULL,
  `created` timestamp(6) NULL DEFAULT current_timestamp(6),
  `btn_down` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `product_id`, `product_type`, `order_type`, `product_name`, `reference`, `format_type`, `use_for`, `additional_info`, `attachment`, `placement`, `size`, `color`, `user_id`, `user_name`, `assign_id`, `assign_name`, `status`, `text`, `btn_pen`, `btn_up`, `created`, `btn_down`) VALUES
(190000, 'AW190000', 'artwork', 'order', NULL, 'makhan', NULL, 'Emboss/De-boss', 'cdsvsd', NULL, NULL, NULL, NULL, '40', 'makhan tarade', '14', 'makhan', 'In Progress', 'warning', 'disabled', '', '2022-01-27 07:54:58.927839', 'disabled'),
(190009, 'AW190001', 'artwork', 'request', NULL, '12345', 'Corel Draw 9 (.cdr)', 'Laser Etching for fabric', 'test', NULL, NULL, NULL, NULL, '50', 'Test1', '14', 'makhan', 'In Progress', 'warning', 'disabled', '', '2022-02-04 20:26:32.402055', 'disabled'),
(190010, 'AW190010', 'artwork', 'order', NULL, '123456', 'Macromedia FreeHand (.fh)', 'others', 'dfkvk', NULL, NULL, NULL, NULL, '50', 'Test1', '14', 'makhan', 'In Progress', 'warning', 'disabled', '', '2022-02-23 12:58:13.599191', 'disabled'),
(190011, 'ED190011', 'digitizing', 'request', NULL, '123456', NULL, NULL, 'fhj', NULL, 'Left Chest', '67', 'ghj', '50', 'Test1', '0', NULL, 'Ordered', 'danger', '', '', '2022-02-23 12:59:00.774309', 'disabled'),
(190012, 'AW190012', 'artwork', 'order', NULL, 'test', 'Adobe Illustrator(.ai)', 'Silk Screen', 'Order', NULL, NULL, NULL, NULL, '50', 'Test1', '14', 'makhan', 'In Progress', 'warning', 'disabled', '', '2022-02-23 14:24:47.671136', 'disabled'),
(190013, 'AW190013', 'artwork', 'order', NULL, 'Test1', 'Corel Draw 11 (.cdr)', 'Silk Screen', 'Test1', NULL, NULL, NULL, NULL, '50', 'Test1', '14', 'makhan', 'In Progress', 'warning', 'disabled', '', '2022-02-23 14:29:14.267298', 'disabled');

-- --------------------------------------------------------

--
-- Table structure for table `production`
--

CREATE TABLE `production` (
  `id` int(11) NOT NULL,
  `email` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `service` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `created` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `production`
--

INSERT INTO `production` (`id`, `email`, `password`, `name`, `phone`, `service`, `created`) VALUES
(14, 'makhantarade@gmail.com', 'Qwerty1@3', 'makhan', '9753346858', 'Web Development', '2021-12-24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone_no` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `zip` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone_no`, `address`, `city`, `zip`, `created`) VALUES
(39, 'Harvey', 'frankthomas707@gmail.com', 'Qwerty1@3', '8446851878', '3600 Kennesaw 75 PKY', 'Kennesaw', '30144', '2022-01-05 18:57:47'),
(40, 'makhan tarade', 'makhantarade@gmail.com', '123456', '9753346858', 'indore', 'indore', '452001', '2022-01-07 16:35:19'),
(41, 'kratik', 'kratik@gmail.com', 'kratik', '', '', '', '', '2022-01-07 17:06:36'),
(42, 'Ziko', 'zikorocks@yahoo.com', 'Qwert1234', '9876543210', 'India', 'Chennai', '603103', '2022-01-08 23:26:27'),
(46, 'kratik', 'kratik.khiani@gmail.com', 'kratik@123', '123456789', 'indore', 'indore', '452001', '2022-01-09 13:24:02'),
(47, 'MichaelEveda', 'ignatovdormidont2823@yandex.ru', 'yx2s@4cLt4J', '84738645752', '', '', '131141', '2022-01-10 23:35:14'),
(50, 'Test1', 'testme@gmail.com', 'testpass', '1234567890', 'tes', 'test', '12345', '2022-02-03 22:11:28'),
(51, 'njjnj', 'kkk@bghkg', 'jkkk', 'jkjkjk', 'kjnk', 'jkkj', '99999', '2022-04-09 12:42:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complete_project`
--
ALTER TABLE `complete_project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mupload`
--
ALTER TABLE `mupload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pmupload`
--
ALTER TABLE `pmupload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_edit`
--
ALTER TABLE `portfolio_edit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `production`
--
ALTER TABLE `production`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `complete_project`
--
ALTER TABLE `complete_project`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2032;

--
-- AUTO_INCREMENT for table `mupload`
--
ALTER TABLE `mupload`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- AUTO_INCREMENT for table `pmupload`
--
ALTER TABLE `pmupload`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `portfolio_edit`
--
ALTER TABLE `portfolio_edit`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190014;

--
-- AUTO_INCREMENT for table `production`
--
ALTER TABLE `production`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
