CREATE DATABASE  IF NOT EXISTS `plantopedia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `plantopedia`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: plantopedia
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `bids_business`
--

DROP TABLE IF EXISTS `bids_business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bids_business` (
  `bid_id_business` int NOT NULL AUTO_INCREMENT,
  `username_business` varchar(45) NOT NULL,
  `bid` varchar(45) NOT NULL,
  `bid_id_farmer` int NOT NULL,
  `bid_accepted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`bid_id_business`),
  UNIQUE KEY `bid_id_UNIQUE` (`bid_id_business`),
  KEY `bid_business_username_idx` (`username_business`),
  KEY `bid_id_farmer_in_bis_idx` (`bid_id_farmer`),
  CONSTRAINT `bid_bus` FOREIGN KEY (`bid_id_farmer`) REFERENCES `bids_farmer` (`bid_id_farmer`),
  CONSTRAINT `bid_business_username` FOREIGN KEY (`username_business`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids_business`
--

LOCK TABLES `bids_business` WRITE;
/*!40000 ALTER TABLE `bids_business` DISABLE KEYS */;
INSERT INTO `bids_business` VALUES (18,'rr','500001',24,0),(19,'rr','80000',20,1),(20,'rr','10000',25,1),(21,'rr','500000',27,0),(22,'rr','50000',28,0),(23,'rr','10000',29,1);
/*!40000 ALTER TABLE `bids_business` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 11:43:30
