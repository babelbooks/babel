SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `BabelDB`
--

Use BabelDB;

--
-- Dumping data for table `BookMetaData`
--

INSERT INTO `BookMetaData` (`MetaDataId`, `ISBN`, `Title`, `Author`, `Edition`, `MajorForm`, `Cover`) VALUES
(1, '9782012010673', 'Saga Twilight - Tome 1 - Fascination', 'Stephenie Meyer', 'Hachette Roman (2 novembre 2005)', 'Roman', 'https://images-na.ssl-images-amazon.com/images/I/41YCFiM5ZAL.jpg'),
(3, '9782013223409', 'Saga Twilight - Tome 2 - Tentation', 'Stephenie Meyer', 'Livre de Poche Jeunesse (1 juin 2011)', 'Roman', NULL),
(4, '9782013224598', 'Twilight - Tome 3 - Hésitation', 'Stephenie Meyer', 'Livre de Poche Jeunesse (12 octobre 2011)', 'Roman', NULL),
(5, '9782710807353', 'La régression PLS: Théorie et pratique', 'Michel Tenenhaus', 'Editions Technip (4 août 1998)', NULL, NULL),
(6, '9782253176503', 'Cinquante nuances de Grey (Fifty Shades, Tome 1)', 'E L James', 'Le Livre de Poche', 'Roman', 'https://images-na.ssl-images-amazon.com/images/I/81ilV%2BDp9bL.jpg'),
(7, '9782253176510', 'Cinquante nuances plus sombres (Fifty Shades, Tome 2) ', 'E L James', 'Le Livre de Poche (26 février 2014)', 'Roman', 'https://images-na.ssl-images-amazon.com/images/I/815rW8r1qtL.jpg'),
(8, '9782253176527', 'Cinquante nuances plus claires (Fifty Shades, Tome 3)', 'E L James', 'Le Livre de Poche (2 avril 2014)', 'Roman', NULL);

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserId`, `Username`, `Password`, `SignUpDate`, `LastName`, `FirstName`, `Points`, `Score`) VALUES
(1, 'Ceyb', 0x4950403abf3082203f6242866736af7bec68accd179e18e4a114ce71d50f655064266502ae844bbc13709ad6efebfc3ca81befe674eeb8c1eaff28a10e906f56, '2017-04-13 19:53:15', 'Sebastien', 'Di Giovanni', 10, NULL),
(2, 'Le Poney', 0x2837e0e9b2d60db5365bd53d37f21ac86f3ed6ff5e3180d279d85a2a661e27cc6862ddde9e9bdbcf7788cb240676bcf79eb5e08af3fab6b0288191685bb4347d, '2017-04-13 19:54:13', 'Clément', 'Espeute', 5, NULL),
(3, 'tabernac', 0x608ae2802078480e94d6af594623e05a8f40140c3c5a55add662cd0c492190204d5a0ab65132ad3726c2ae7cd04805298183da6879e274eba85e96b58dc52f5a, '2017-04-13 20:17:55', 'Charles', 'Belzile', 50, NULL);

--
-- Dumping data for table `Book`
--

INSERT INTO `Book` (`BookId`, `BookMetaDataId`, `UserId`) VALUES
(1, 1, 1),
(2, 3, 1),
(3, 4, 1),
(4, 5, 2),
(5, 1, 2),
(6, 6, 3),
(7, 7, 3),
(8, 8, 3);

--
-- Dumping data for table `Borrow`
--

INSERT INTO `Borrow` (`BorrowId`, `BookId`, `UserId`, `EndDate`) VALUES
(1, 2, 2, '2017-04-04 08:40:12'),
(2, 4, 1, NULL),
(3, 6, 1, '2017-04-06 07:40:52'),
(4, 7, 1, NULL);


COMMIT;
