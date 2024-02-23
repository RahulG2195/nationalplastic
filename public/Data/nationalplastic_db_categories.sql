-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: nationalplastic_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Karnival Chair','Karnival-Chair.jpg-2/Karnival-Chair.jpg-2.png',1,'2024-02-15 11:49:36'),(2,'Atlantis Chair','Atlantis-Chair.jpg-2/Atlantis-Chair.jpg-2.png',1,'2024-02-15 11:49:36'),(3,'Karen Chair','Karen-Chair.jpg-2/Karen-Chair.jpg-2.png',1,'2024-02-15 11:49:36'),(4,'Orca Chair','Orca-Chair 2/Orca-Chair 2.png',1,'2024-02-15 11:49:36'),(5,'Magna Chair','Magna-Chair.jpg-2/Magna-Chair.jpg-2.png',1,'2024-02-15 11:49:36'),(6,'Saab Chair','Saab-Chair.jpg-2/Saab-Chair.jpg-2.png',1,'2024-02-15 11:49:36'),(7,'Leisure Chair','Leisure-Chair.jpg-2/Leisure-Chair.jpg-2.png',1,'2024-02-15 11:49:36'),(8,'Merc Sofa Chair','Merc-Sofa-Chair.jpg-2/Merc-Sofa-Chair.jpg-2.png',1,'2024-02-15 11:49:36'),(9,'Omega Chair','Omega-Chair.jpg-2/Omega-Chair.jpg-2.png',1,'2024-02-15 11:49:36'),(10,'Storm Chair','Storm-Chair/Storm-Chair.png',1,'2024-02-15 11:49:36'),(11,'Solace Chair','Solace-chair/Solace-chair.png',1,'2024-02-15 11:49:36'),(12,'Ghost Chair','Ghost-Chair/Ghost-Chair.png',1,'2024-02-15 11:49:36');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-23 16:57:44
