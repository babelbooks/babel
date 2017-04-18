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
-- User: the one thanks to whom our app will access babeldb
--
DROP USER IF EXISTS `borges`@`localhost`;
CREATE USER `borges`@`localhost` IDENTIFIED BY 'devonly';
GRANT INSERT, SELECT, UPDATE ON `BabelDB`.* TO `borges`@`localhost`;

-- --------------------------------------------------------

--
-- Table structure for table `Book`
--

CREATE TABLE `Book` (
  `bookId` bigint(20) NOT NULL,
  `isbn` bigint(20) DEFAULT NULL,
  `origin` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Original owner',
  `available` boolean NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Borrow`
--

CREATE TABLE `Borrow` (
  `borrowId` bigint(20) NOT NULL,
  `bookId` bigint(20) NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `beginDate` timestamp NOT NULL,
  `dateOfReturn` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `lastName` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `points` int(11) NOT NULL,
  `score` bigint(20) DEFAULT NULL,
  `signUpDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Indexes for table `Book`
--
ALTER TABLE `Book`
  ADD PRIMARY KEY (`bookId`),
  ADD KEY `username` (`origin`),
  ADD KEY `isbn` (`isbn`);

--
-- Indexes for table `Borrow`
--
ALTER TABLE `Borrow`
  ADD PRIMARY KEY (`borrowId`),
  ADD KEY `bookId` (`bookId`),
  ADD KEY `username` (`userId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`username`),
  ADD KEY `username` (`username`);

-- --------------------------------------------------------

--
-- AUTO_INCREMENT for table `Book`
--
ALTER TABLE `Book`
  MODIFY `bookId` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Borrow`
--
ALTER TABLE `Borrow`
  MODIFY `borrowId` bigint(20) NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Constraints for table `Book`
--
ALTER TABLE `Book`
  ADD CONSTRAINT `Book_ibfk_1` FOREIGN KEY (`origin`) REFERENCES `User` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Borrow`
--
ALTER TABLE `Borrow`
  ADD CONSTRAINT `Borrow_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `Book` (`bookId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Borrow_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE;

DELIMITER $$

CREATE FUNCTION newBorrowing
(myBookId bigint,
 myUserId varchar(255)
) RETURNS BOOLEAN
BEGIN

	IF( (select available FROM Book WHERE bookId = myBookId)) then 
    	UPDATE Book SET Book.available = FALSE
		WHERE Book.bookId = myBookId;
		
		UPDATE Borrow SET Borrow.dateOfReturn = Now()
		WHERE Borrow.bookId = myBookId && Borrow.dateOfReturn IS NULL;

		INSERT INTO Borrow(borrowId, bookId, userId, beginDate, dateOfReturn) VALUES (NULL, myBookId, myUserId, Now(), NULL);

		RETURN TRUE;
	ELSE
		RETURN FALSE;
    END IF;

END $$

DELIMITER ;

COMMIT;
