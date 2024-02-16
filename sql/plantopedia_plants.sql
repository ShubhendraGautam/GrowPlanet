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
-- Table structure for table `plants`
--

DROP TABLE IF EXISTS `plants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plants` (
  `name` varchar(20) NOT NULL,
  `description` varchar(500) NOT NULL,
  `soil` varchar(200) NOT NULL,
  `water` varchar(200) NOT NULL,
  `fertilizer` varchar(200) NOT NULL,
  `temperature` varchar(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `nutrition` varchar(200) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plants`
--

LOCK TABLES `plants` WRITE;
/*!40000 ALTER TABLE `plants` DISABLE KEYS */;
INSERT INTO `plants` VALUES ('apple','Apple trees are large deciduous trees that belong to the rose family. They are grown for their edible fruit and ornamental value. The apple tree is one of the oldest cultivated fruit trees. The trees can grow up to 20 feet tall, and they produce white flowers in the spring. The fruit is green and red in color, and it has a sweet, tart flavor. The tree is hardy and can survive in a variety of climates.','Apple trees need well-drained, loamy soil that is rich in organic matter. The soil should also be slightly acidic, with a pH level between 6.0 and 6.5.','Apple trees need about 1 inch of water per week during the growing season. Watering should be done at the base of the tree, rather than overhead.','Apple trees need to be fertilized twice a year, once in the spring and once in the fall. Use an all-purpose fertilizer that is formulated for fruit trees.','Apple trees prefer temperatures between 65 and 75 degrees Fahrenheit. They can survive temperatures as low as -30 degrees Fahrenheit.','It takes about four to five years for an apple tree to reach maturity and begin producing fruit. Once the tree is mature, it will produce fruit for many years.','Apples are a great source of fiber, vitamins, and minerals. They are low in calories and contain antioxidants and phytonutrients that may help reduce the risk of certain diseases.'),('cabbage','Cabbage is a hardy, leafy vegetable that is often used in many dishes. It has a mild, slightly sweet taste, and can be eaten raw or cooked. The leaves of the cabbage are usually dark green and tightly packed together, and often have a crinkled or wavy appearance. The stems of the cabbage are usually pale green and can be either smooth or rough. Cabbage is a cool-season crop that is easy to grow in most climates, and is often grown in both spring and fall.','Cabbage prefers a fertile, well-drained soil with a pH between 6.0 and 6.8. The soil should be high in organic matter, such as compost or well-rotted manure, and should be kept evenly moist.','Cabbage should be watered regularly, especially during dry spells. It is best to water the soil around the plant, rather than directly on the plant, to avoid disease problems.','Cabbage should be fertilized every few weeks with a balanced fertilizer, such as 10-10-10. A slow-release fertilizer can also be used, such as an organic manure-based fertilizer.','Cabbage prefers cool temperatures, between 45 and 75 degrees Fahrenheit. It can tolerate some heat, but will not produce as much if the temperature gets too high.','Cabbage takes between 50 and 120 days to grow, depending on the variety. Most varieties are ready to harvest when the heads are firm and the leaves are tightly packed.','Cabbage is a great source of vitamins A, C, and K, as well as dietary fiber and minerals such as calcium, magnesium, and potassium. It is also low in calories and fat.'),('carrots','Carrots are a cool-season root vegetable that grows best in temperate climates. The root is usually orange in color, but some varieties come in yellow, white, red, and purple. Carrots are biennial plants, meaning they take two years to complete their life cycle. The first year, leaves and a central taproot are produced. The second year, a flowering stem is produced and the taproot swells in size.','Carrots need well-drained, fertile, sandy loam soil with a pH between 6.0 and 6.8.','Carrots need about 1 inch of water a week for optimal growth. Watering early in the day is best.','Carrots need a moderate amount of fertilizer. A balanced fertilizer such as 10-10-10 should be applied at planting time and again after the plants reach 4 inches in height.','Carrots prefer temperatures between 60 and 70 degrees Fahrenheit. The optimal temperature for germination is 65-75 degrees Fahrenheit.','Carrots take between 60-80 days to reach maturity, depending on the variety.','Carrots are a good source of vitamins A, C, K, and B6, as well as thiamin, niacin, folate, and pantothenic acid. They are also an excellent source of dietary fiber, potassium, and manganese.'),('peas','Peas are a cool-weather legume that is easy to grow. They are a cool-season crop, preferring temperatures between 40-80 degrees Fahrenheit. The plants can vary in size, from short bush varieties to tall vines. The pods are typically green and are filled with small, round edible seeds. The plants require full sun and well-drained soil that is high in nitrogen, clay, or loam. Peas are best started from seed in early spring and can be grown in containers or directly in the ground.','Well-drained, high-nitrogen soil that is clay, loam, or a mixture of the two.','Moderate water is needed for best results, about an inch per week.','High nitrogen fertilizer such as fish emulsion or a slow-release fertilizer should be used at planting time and then again after the plants have started to flower.','40-80Â°F for optimal growth.','Peas can be grown in as little as 60 days, depending on the variety.','Peas are a good source of dietary fiber, protein, vitamins A, C and K, magnesium, phosphorus, iron, and folate. They are also a good source of antioxidants.'),('potato','Potatoes are a cool-season vegetable that are grown from small, egg-shaped tubers. They are a member of the nightshade family, which includes tomatoes, peppers, and eggplants. Potatoes are a versatile and popular vegetable that can be boiled, baked, mashed, or fried. They are also a good source of dietary fiber and vitamins.','Potatoes need loamy soil that is well-drained and full of organic matter. The soil should have a pH between 5.0 and 6.5 for optimal growth.','Potatoes need a steady supply of water to grow successfully. The soil should be kept evenly moist, but not soggy. Watering should be done at the base of the plant to avoid wetting the leaves.','Potatoes need to be fertilized regularly to ensure optimal growth and yields. A balanced fertilizer with a ratio of 10-10-10 should be applied every three to four weeks.','Potatoes need cool weather to grow successfully. They can tolerate temperatures as low as 40°F, but they will not grow if temperatures are above 80°F.','Potatoes take about 70 to 135 days to reach maturity, depending on the variety. Early-maturing varieties take 70 days, while late-maturing varieties take up to 135 days.','Potatoes are a good source of dietary fiber, vitamins, and minerals. They are high in potassium, vitamin C, and vitamin B6. They also contain a small amount of protein.'),('raddish','Radishes are a root vegetable that are cool-season crops. They are part of the Brassicaceae family, which also includes cabbage, kale, and turnips. Radishes come in a variety of shapes, sizes, and colors, ranging from small, round red varieties to large, elongated white varieties. Radishes can be eaten raw, pickled, cooked, or fermented.','Radishes prefer a light, well-drained, fertile soil with a pH of 6.0-7.0. The soil should also be high in organic matter and have good drainage.','Radishes need an even supply of water throughout the growing season, especially during hot, dry weather. The soil should be kept moist, but not soggy.','Radishes require a balanced fertilizer, such as a 10-10-10 or 12-12-12. If you are using a liquid fertilizer, use it at half strength.','Radishes prefer cooler temperatures, and will not grow well if temperatures are too high. Optimal temperatures are between 45-85Â°F (7-29Â°C).','Radishes are a fast-growing crop and can be harvested in as little as 3-4 weeks. It is best to plant them at the start of the growing season, in early spring or late fall.','Radishes are a good source of vitamin C, folate, potassium, and magnesium. They also contain some fiber, vitamin B6, and calcium.'),('tomato','Tomatoes are a warm-season vegetable that is typically grown as an annual. It is a member of the nightshade family, related to potatoes, eggplants, and peppers. Tomatoes are a popular choice for home vegetable gardens because they are easy to grow and produce an abundance of fruit, typically in the form of an edible red berry.','Tomatoes require well-drained, nutrient-rich soil. The soil should be amended with compost prior to planting. A pH of 6.2 to 6.5 is best for tomatoes.','Tomatoes should be watered deeply, about 1-2 inches per week, depending on soil and weather conditions. Water at the base of the plant and avoid wetting the leaves.','Tomatoes require regular fertilization for best performance. Use a balanced fertilizer such as 10-10-10 or a fertilizer designed for tomatoes.','Tomatoes prefer warm temperatures, ideally between 65 and 85°F, with nighttime temperatures remaining above 55°F. If temperatures drop too low, the plant may suffer from cold damage.','Tomatoes typically take about 70 to 80 days to reach maturity from the time of planting.','Tomatoes are an excellent source of vitamin C, as well as a good source of vitamin A, dietary fiber, and potassium. They also contain small amounts of calcium and iron.');
/*!40000 ALTER TABLE `plants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 11:43:31
