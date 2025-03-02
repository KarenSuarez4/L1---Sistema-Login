CREATE DATABASE  IF NOT EXISTS `login_node` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `login_node`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: login_node
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `audit`
--

DROP TABLE IF EXISTS `audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit` (
  `id_audit` int NOT NULL AUTO_INCREMENT,
  `table_name` varchar(45) NOT NULL,
  `operation_type` varchar(45) NOT NULL,
  `before_data` blob NOT NULL,
  `new_data` blob NOT NULL,
  `data_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_audit`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `audit_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit`
--

LOCK TABLES `audit` WRITE;
/*!40000 ALTER TABLE `audit` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id_role` char(3) NOT NULL,
  `name_role_user` varchar(45) NOT NULL,
  `description_role_user` varchar(45) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('Adm','Admin','User with privilages of Admin'),('emp','Employee','User with privilages of Employee'),('sAd','SuperAdmin','User SuperAdmin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id_role` char(3) NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_role`,`id_user`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('Adm',1),('emp',1),('sAd',1),('emp',2),('emp',3),('emp',4),('emp',5),('Adm',6),('emp',6),('emp',7),('Adm',16);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `document_number_person` varchar(15) NOT NULL,
  `email_user` varchar(45) NOT NULL,
  `first_name_person` varchar(45) NOT NULL,
  `last_name_person` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_actived` tinyint NOT NULL DEFAULT '1',
  `count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  UNIQUE KEY `document_number_person_UNIQUE` (`document_number_person`),
  UNIQUE KEY `email_user_UNIQUE` (`email_user`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'superAdmin','$2b$10$4sEO.jrSPibGLdHd.Rhx8uuzwtjelKIWtR2rOP2Bsq1PJeJL71h8K','123456782','lunna.sosa@uptc.edu.co','super','Admin','2025-02-25 11:26:23',1,0),(2,'Ronald','$2b$10$b3XdKTjXdWVGAOvKB4..auOZ0Cr28JPQfv881ZCNKH9n6f0k.pnhq','1234561','befyeyuste@gufum.c','Ronald','Molinares','2025-02-25 15:33:14',1,0),(3,'lunna_sosa','$2b$08$AwATU2aRkTU5LZ0ggEMyae6sklD3G0uk26qjxrnvlqe3lrZzSRKMa','1234567890','sosa@s','Lunna','sosa','2025-02-24 03:19:54',1,0),(4,'karen','$2b$10$b3XdKTjXdWVGAOvKB4..auOZ0Cr28JPQfv881ZCNKH9n6f0k.pnhq','12345670','befyeyuste@gufum.com','Lunna','Sosa','2025-02-25 14:42:17',1,3),(5,'juliana','$2b$10$.R1n9RVMZk7dLJdkWQEfcOwzRjvI5gRDWY0dB74u8N.jh1nkV7L3K','1234','kisite8622@envoes.com','Juliana','Suarez','2025-02-25 15:48:10',1,0),(6,'cami_209','$2b$10$6ha.FKgx7N7kjHFyzPfTaewU5mUcZ65b2AQ1HXRTbmyKBvJi84gQq','1050091','sosalunna2@gmail.com','Camila','Sosa','2025-02-24 02:57:35',1,0),(7,'cami_202','$2b$10$FFuMmqQDmhC2BYCr8jIom.nW5G7T3LfE9wt7Fo/id12Sq4Xe7JyTi','1050090607','lunna2@gmail.co','Camila','Sosa','2025-02-24 03:23:08',0,6),(16,'ana_espitia','$2b$08$03Kb7ie/WDivYuLiR.SiOujDX0P6BVaNvrG0G.fRMa9UjJNE0r4Te','40049214','liyen.sosa01@uptc.edu.co','Ana','Espitia','2025-03-02 03:36:32',1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-01 23:15:47
