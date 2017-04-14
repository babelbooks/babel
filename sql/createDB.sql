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
  `bookId` bigint(20) NOT NULL,
  `bookMetaDataId` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL COMMENT 'Original owner',
  `available` boolean NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `BookMetaData`
--

CREATE TABLE `BookMetaData` (
  `metaDataId` bigint(20) NOT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `author` varchar(200) NOT NULL,
  `edition` varchar(200) DEFAULT NULL,
  `majorForm` varchar(200) DEFAULT NULL COMMENT 'ie Theatre, novel etc.',
  `cover` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Borrow`
--

CREATE TABLE `Borrow` (
  `borrowId` bigint(20) NOT NULL,
  `bookId` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `beginDate` timestamp NOT NULL,
  `dateOfReturn` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userId` bigint(20) NOT NULL,
  `username` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` binary(64) NOT NULL,
  `signUpDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastName` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `firstName` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `points` int(11) NOT NULL,
  `score` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for table `Book`
--
ALTER TABLE `Book`
  ADD PRIMARY KEY (`bookId`),
  ADD KEY `bookMetaDataId` (`bookMetaDataId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `BookMetaData`
--
ALTER TABLE `BookMetaData`
  ADD PRIMARY KEY (`metaDataId`);

--
-- Indexes for table `Borrow`
--
ALTER TABLE `Borrow`
  ADD PRIMARY KEY (`borrowId`),
  ADD KEY `bookId` (`bookId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for table `Book`
--
ALTER TABLE `Book`
  MODIFY `bookId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `BookMetaData`
--
ALTER TABLE `BookMetaData`
  MODIFY `metaDataId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Borrow`
--
ALTER TABLE `Borrow`
  MODIFY `borrowId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `userId` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for table `Book`
--
ALTER TABLE `Book`
  ADD CONSTRAINT `Book_ibfk_1` FOREIGN KEY (`bookMetaDataId`) REFERENCES `BookMetaData` (`metaDataId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Book_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Borrow`
--
ALTER TABLE `Borrow`
  ADD CONSTRAINT `Borrow_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `Book` (`bookId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `Borrow_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`) ON DELETE NO ACTION ON UPDATE CASCADE;

DELIMITER $$

CREATE FUNCTION newBorrowing
(myBookId bigint,
 myUserId bigint
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

END

$$ DELIMITER ;

COMMIT;
