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
-- Table structure for table `bids_farmer`
--

DROP TABLE IF EXISTS `bids_farmer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bids_farmer` (
  `bid_id_farmer` int NOT NULL AUTO_INCREMENT,
  `crop` varchar(45) NOT NULL,
  `base` int NOT NULL,
  `quantity` int NOT NULL,
  `username_farmer` varchar(45) NOT NULL,
  `bid_accepted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`bid_id_farmer`),
  UNIQUE KEY `bid_id_UNIQUE` (`bid_id_farmer`),
  KEY `user_bid_id_idx` (`username_farmer`),
  CONSTRAINT `user_bid_id` FOREIGN KEY (`username_farmer`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids_farmer`
--

LOCK TABLES `bids_farmer` WRITE;
/*!40000 ALTER TABLE `bids_farmer` DISABLE KEYS */;
INSERT INTO `bids_farmer` VALUES (19,'Apple',5000,30,'ram',0),(20,'Jute',80000,30,'ram',1),(21,'Cotton',90000,20,'ram',0),(22,'Orange',50000,20,'popo',0),(23,'Lotus',200,50,'popo',0),(24,'Soyabean',50000,10,'popo',0),(25,'Cucumber',5000,30,'ram',1),(26,'Barley',20,1,'ram',0),(27,'Cotton',50000,20,'ram',0),(28,'Apple',30000,10,'ram',0),(29,'Tomato',5000,10,'ram',1);
/*!40000 ALTER TABLE `bids_farmer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 11:43:29
