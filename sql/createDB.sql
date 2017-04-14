SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `BabelDB`
--
DROP DATABASE IF EXISTS BabelDB;
CREATE DATABASE BabelDB;
USE BabelDB;

-- --------------------------------------------------------

--
-- Table structure for table `Book`
--

CREATE TABLE `Book` (
  `BookId` bigint(20) NOT NULL,
  `BookMetaDataId` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL COMMENT 'Original owner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `BookMetaData`
--

CREATE TABLE `BookMetaData` (
  `MetaDataId` bigint(20) NOT NULL,
  `ISBN` varchar(20) DEFAULT NULL,
  `Title` varchar(200) NOT NULL,
  `Author` varchar(200) NOT NULL,
  `Edition` varchar(200) DEFAULT NULL,
  `MajorForm` varchar(200) DEFAULT NULL COMMENT 'ie Theatre, novel etc.',
  `Cover` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Borrow`
--

CREATE TABLE `Borrow` (
  `BorrowId` bigint(20) NOT NULL,
  `BookId` bigint(20) NOT NULL,
  `UserId` bigint(20) NOT NULL,
  `EndDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserId` bigint(20) NOT NULL,
  `Username` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Password` binary(64) NOT NULL,
  `SignUpDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastName` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `FirstName` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Points` int(11) NOT NULL,
  `Score` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for table `Book`
--
ALTER TABLE `Book`
  ADD PRIMARY KEY (`BookId`),
  ADD KEY `BookMetaDataId` (`BookMetaDataId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `BookMetaData`
--
ALTER TABLE `BookMetaData`
  ADD PRIMARY KEY (`MetaDataId`);

--
-- Indexes for table `Borrow`
--
ALTER TABLE `Borrow`
  ADD PRIMARY KEY (`BorrowId`),
  ADD KEY `BookId` (`BookId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `UserId` (`UserId`);

--
-- AUTO_INCREMENT for table `Book`
--
ALTER TABLE `Book`
  MODIFY `BookId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `BookMetaData`
--
ALTER TABLE `BookMetaData`
  MODIFY `MetaDataId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Borrow`
--
ALTER TABLE `Borrow`
  MODIFY `BorrowId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserId` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for table `Book`
--
ALTER TABLE `Book`
  ADD CONSTRAINT `Book_ibfk_1` FOREIGN KEY (`BookMetaDataId`) REFERENCES `BookMetaData` (`MetaDataId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Book_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Borrow`
--
ALTER TABLE `Borrow`
  ADD CONSTRAINT `Borrow_ibfk_1` FOREIGN KEY (`BookId`) REFERENCES `Book` (`BookId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Borrow_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`) ON DELETE NO ACTION ON UPDATE CASCADE;


COMMIT;
