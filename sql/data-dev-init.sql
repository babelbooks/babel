SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: ``BabelDB``
--
DROP DATABASE IF EXISTS `BabelDB`;
CREATE DATABASE `BabelDB`;
USE `BabelDB`;

-- --------------------------------------------------------

--
-- User: the one thanks to whom our app will access `babeldb`
--
DROP USER IF EXISTS `borges`@`%`;
CREATE USER `borges`@`%` IDENTIFIED BY 'devonly';
GRANT INSERT, SELECT, UPDATE ON `BabelDB`.* TO `borges`@`%`;

FLUSH PRIVILEGES;

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
  `points` int(11) DEFAULT 2,
  `score` bigint(20) DEFAULT 0,
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

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: ``BabelDB``
--

Use `BabelDB`;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`username`, `password`, `signUpDate`, `lastName`, `firstName`, `points`, `score`) VALUES
('Ceyb', '0x4950403abf3082203f6242866736af7bec68accd179e18e4a114ce71d50f655064266502ae844bbc13709ad6efebfc3ca81befe674eeb8c1eaff28a10e906f56', '2017-04-13 19:53:15', 'Sebastien', 'Di Giovanni', 10, NULL),
('Le Poney', '0x2837e0e9b2d60db5365bd53d37f21ac86f3ed6ff5e3180d279d85a2a661e27cc6862ddde9e9bdbcf7788cb240676bcf79eb5e08af3fab6b0288191685bb4347d', '2017-04-13 19:54:13', 'Clément', 'Espeute', 5, NULL),
('tabernac', '0x608ae2802078480e94d6af594623e05a8f40140c3c5a55add662cd0c492190204d5a0ab65132ad3726c2ae7cd04805298183da6879e274eba85e96b58dc52f5a', '2017-04-13 20:17:55', 'Charles', 'Belzile', 50, NULL);

--
-- Dumping data for table `Book`
--

INSERT INTO `Book` (`bookId`, `origin`, `available`) VALUES
(1, 2266182692, 'Ceyb', TRUE),
(2, 2266182706, 'Ceyb', TRUE),
(3, 2266182714, 'Ceyb', TRUE),
(4, 2070360024, 'Le Poney', FALSE),
(5, 2253001279, 'Le Poney', TRUE),
(6, 0547928211, 'tabernac', FALSE),
(7, 0590353403, 'tabernac', FALSE),
(8, 0316015849, 'tabernac', TRUE);

--
-- Dumping data for table `Borrow`
--

INSERT INTO `Borrow` (`borrowId`, `bookId`, `userId`, `beginDate`, `dateOfReturn`) VALUES
(1, 2, 'Le Poney', '2017-04-02 10:40:16', '2017-04-04 08:40:12'),
(2, 4, 'Ceyb', '2017-04-10 17:34:23', NULL),
(3, 6, 'Ceyb', '2017-04-06 07:40:52', NULL),
(4, 7, 'Ceyb', '2017-04-12 18:34:23', NULL);


COMMIT;
