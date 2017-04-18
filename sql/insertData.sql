SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `BabelDB`
--

Use BabelDB;

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
(1, 'Ceyb', TRUE),
(2, 'Ceyb', TRUE),
(3, 'Ceyb', TRUE),
(4, 'Le Poney', FALSE),
(5, 'Le Poney', TRUE),
(6, 'tabernac', FALSE),
(7, 'tabernac', FALSE),
(8, 'tabernac', TRUE);

--
-- Dumping data for table `Borrow`
--

INSERT INTO `Borrow` (`borrowId`, `bookId`, `userId`, `beginDate`, `dateOfReturn`) VALUES
(1, 2, 'Le Poney', '2017-04-02 10:40:16', '2017-04-04 08:40:12'),
(2, 4, 'Ceyb', '2017-04-10 17:34:23', NULL),
(3, 6, 'Ceyb', '2017-04-06 07:40:52', NULL),
(4, 7, 'Ceyb', '2017-04-12 18:34:23', NULL);


COMMIT;
