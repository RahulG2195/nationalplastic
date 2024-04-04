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
-- Table structure for table `customer_detail`
--

DROP TABLE IF EXISTS `customer_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_detail` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `ConfirmPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_detail`
--

LOCK TABLES `customer_detail` WRITE;
/*!40000 ALTER TABLE `customer_detail` DISABLE KEYS */;
INSERT INTO `customer_detail` VALUES (1,'Vincent123','Sampson','degevemo@mailinator.com','+1 (776) 741-7742','Pa$$w0rd!','Pa$$w0rd!'),(2,'Jocelyn','Brooks','filaqaqebe@mailinator.com','+1 (195) 411-8328','Pa$$w0rd!','Pa$$w0rd!'),(3,'Hedy','Gamble','syzufit@mailinator.com','+1 (457) 943-7165','Pa$$w0rd!','Pa$$w0rd!'),(4,'sd','dsd','shankar@crezvatic.com','1233333333','123','123'),(5,'Dylan','Preston','wacexobug@mailinator.com','+1 (181) 826-5322','Pa$$w0rd!','Pa$$w0rd!'),(6,'vvcv','juyg','shankar@crezvatic.com','scnss@ddd','123','123'),(7,'Len','Langley','diqih@mailinator.com','+1 (674) 151-6824','Pa$$w0rd!','Pa$$w0rd!'),(8,'sss','sss','fffff@gmail.com','ssss','',''),(9,'Bevis','Odonnell','hiqup@mailinator.com','9999999999','Pa$$w0rd!','Pa$$w0rd!'),(10,'Shaeleigh','Davis','sekekivo@mailinator.com','9999999999','Pa$$w0rd!','Pa$$w0rd!'),(11,'Colt','Hurst','hiqup@mailinator.com','1234567890','Pa$$w0rd!','Pa$$w0rd!'),(12,'Silas','Sparks','hiqup123@mailinator.com','1234567890','Pa$$w0rd!','Pa$$w0rd!'),(13,'Maggie','Flynn','hiqup@mailinator.com','1234567890','Pa$$w0rd!','Pa$$w0rd!'),(14,'Daria','Trevino','qegopeqe@mailinator.com','9876543210','Pa$$w0rd!','Pa$$w0rd!'),(15,'Clementine','Rodriquez','hiqup1234@mailinator.com','9999999999','Pa$$w0rd!','Pa$$w0rd!'),(16,'Siddhesh','Dhamale','Siddhesh123@test.com','9898989898','rc','rc'),(17,'www','vvv','zz@gmail.com','9999999999','zz','zz'),(18,'Dolan','Holder','as@gmail.com','9999999999','asdf','asdf'),(19,'Aishwarya','Bhoir','aishwarya@gmail.com','9999999999','12','12'),(20,'Patience','Lynn','vimase@mailinator.com','9999999999','Pa$$w0rd!','Pa$$w0rd!'),(21,'Ocean','Richmond','aa@gmail.com','9999999999','Pa$$w0rd!','Pa$$w0rd!'),(22,'aa','bbb','aish@gmail.com','6999878787','123','123'),(23,'a','b','ab@gmail.com','9999999999','111','111'),(24,'Adria','Randall','peliqiso@mailinator.com','1234567890','Pa$$w0rd!','Pa$$w0rd!'),(25,'Matthew','York','sexapozer@mailinator.com','1234567890','Pa$$w0rd!','Pa$$w0rd!'),(26,'Ayanna','Reilly','reza@mailinator.com','8989898989','Pa$$w0rd!','Pa$$w0rd!'),(27,'Anastasia','Donaldson','rekalagov@mailinator.com','9999999999','Pa$$w0rd!','Pa$$w0rd!'),(28,'Web','developer','webdeveloper.crezvatic@gmail.com','1234567890','1212','1212'),(29,'siddhesh ','Dhamale','siddhes@gmail.com','9561856673','9561856673','9561856673'),(30,'siddhesh ','Dhamale','sidh@123gmail.com','9561856673','9561856673','9561856673');
/*!40000 ALTER TABLE `customer_detail` ENABLE KEYS */;
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
