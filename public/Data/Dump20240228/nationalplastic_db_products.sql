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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_description` text,
  `short_description` text,
  `long_description` text,
  `seo_titile` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `image_name` varchar(100) DEFAULT NULL,
  `seo_url` varchar(255) DEFAULT NULL,
  `discount_percentage` varchar(10) DEFAULT NULL,
  `categoryType` varchar(255) DEFAULT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `duration` varchar(255) DEFAULT NULL,
  `InstallationCharges` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_category_id` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'SHAMIYANA',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,1,1000.00,900.00,'New-launches-1.png',NULL,'10%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(2,'KARNIVAL',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,2,2000.00,100.00,'New-launches-1.png',NULL,'11%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(3,'Atlantis',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,3,3000.00,100.00,'New-launches-1.png',NULL,'12%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(4,'KAREN',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,4,4000.00,100.00,'New-launches-1.png',NULL,'13%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(5,'ORCA',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,5,5000.00,100.00,'New-launches-1.png',NULL,'14%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(6,'MAGNA',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,6,6000.00,100.00,'New-launches-1.png',NULL,'15%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(7,'SAAB',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,7,7000.00,100.00,'New-launches-1.png',NULL,'16%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(8,'Leisure',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,8,8000.00,100.00,'New-launches-1.png',NULL,'13%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(9,'MERC SOFA',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,9,9000.00,100.00,'New-launches-1.png',NULL,'15%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(10,'OMEGA',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,10,10000.00,100.00,'New-launches-1.png',NULL,'16%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(11,'STORM',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,11,1100.00,100.00,'New-launches-1.png',NULL,'15%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(12,'SOLACE',NULL,NULL,'Lorem ipsum dolor sit amet.',NULL,NULL,12,1200.00,100.00,'New-launches-1.png',NULL,'16%','premium chairs','2024-02-16 09:16:54',NULL,40.00),(14,'Event Chair',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'home_top_pics','2024-02-16 09:16:54',NULL,40.00),(15,'Premium Chair',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'home_top_pics','2024-02-16 09:16:54',NULL,40.00),(16,'Kids Chair',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'home_top_pics','2024-02-16 09:16:54',NULL,40.00),(17,'Sets',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Bedroom.jpg',NULL,NULL,'shop_by_room','2024-02-16 09:16:54',NULL,40.00),(18,'Storage',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Dining.jpg',NULL,NULL,'shop_by_room','2024-02-16 09:16:54',NULL,40.00),(19,'Seating',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Living-Room.jpg',NULL,NULL,'shop_by_room','2024-02-16 09:16:54',NULL,40.00),(20,'tables',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Dining.jpg',NULL,NULL,'shop_by_room','2024-02-16 09:16:54',NULL,40.00),(21,'Kids Chair',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Living-Room.jpg',NULL,NULL,'shop_by_room','2024-02-16 09:16:54',NULL,40.00),(22,'Lorem Ipsum is simply dummy text',NULL,NULL,'Lorem Ipsum is simply dummy text',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'highlights','2024-02-16 09:16:54',NULL,40.00),(23,'Lorem Ipsum is simply dummy text',NULL,NULL,'Lorem Ipsum is simply dummy text',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'highlights','2024-02-16 09:16:54',NULL,40.00),(24,'Lorem Ipsum is simply dummy text',NULL,NULL,'Lorem Ipsum is simply dummy text',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'highlights','2024-02-16 09:16:54',NULL,40.00),(25,'Dining Table Set',NULL,NULL,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'Blog','2024-02-16 09:38:06','5 minutes',40.00),(26,'Multipurpose Storage',NULL,NULL,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'Blog','2024-02-16 09:38:06','5 minutes',40.00),(27,'Kids Chair',NULL,NULL,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'Blog','2024-02-16 09:38:06','5 minutes',40.00),(28,'Dining Table Set',NULL,NULL,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'Blog','2024-02-16 09:38:52','5 minutes',40.00),(29,'Multipurpose Storage',NULL,NULL,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'Blog','2024-02-16 09:38:52','5 minutes',40.00),(30,'Kids Chair',NULL,NULL,'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',NULL,NULL,NULL,NULL,NULL,'1st-section-kids-chair.jpg',NULL,NULL,'Blog','2024-02-16 09:38:52','5 minutes',40.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-28 10:22:41
