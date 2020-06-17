CREATE DATABASE `grupo_2_sweetmakeup`;

USE `grupo_2_sweetmakeup`;

CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`)
) 


CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`)
) 



CREATE TABLE `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`)
) 



CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`)
) 



CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(500) DEFAULT NULL,
  `lastName` varchar(500) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`)
) 


CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `number` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `zipCode` varchar(100) DEFAULT NULL,
  `floor` varchar(100) DEFAULT NULL,
  `apartment` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `neighborhood` varchar(100) DEFAULT NULL,
  `observations` varchar(100) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`),
  KEY `addresses_fk` (`userId`),
  CONSTRAINT `addresses_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) 



CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `ingredients` varchar(500) DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `dicount` decimal(4,2) DEFAULT NULL,
  `weight` decimal(6,2) DEFAULT NULL,
  `height` decimal(6,2) DEFAULT NULL,
  `width` decimal(6,2) DEFAULT NULL,
  `length` decimal(6,2) DEFAULT NULL,
  `brandId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`),
  KEY `products_fk` (`categoryId`),
  KEY `products_fk_1` (`brandId`),
  CONSTRAINT `products_fk` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_fk_1` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`)
) 



CREATE TABLE `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `payment` varchar(100) DEFAULT NULL,
  `invoice` varchar(100) DEFAULT NULL,
  `addressId` int(11) NOT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`),
  KEY `purchases_fk` (`addressId`),
  KEY `purchases_fk_1` (`userId`),
  CONSTRAINT `purchases_fk` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`),
  CONSTRAINT `purchases_fk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) 




CREATE TABLE `user_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
   PRIMARY KEY (`id`),
  KEY `user_product_fk` (`productId`),
  KEY `user_product_fk_1` (`userId`),
  CONSTRAINT `user_product_fk` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `user_product_fk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) 



CREATE TABLE `color_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `colorId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,2
  PRIMARY KEY (`id`),
  KEY `color_product_fk` (`colorId`),
  KEY `color_product_fk_1` (`productId`),
  CONSTRAINT `color_product_fk` FOREIGN KEY (`colorId`) REFERENCES `colors` (`id`),
  CONSTRAINT `color_product_fk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) 



CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `route` varchar(500) NOT NULL,
  `size` varchar(500) DEFAULT NULL,
  `fileType` varchar(500) DEFAULT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` DATETIME,
   `updatedAt` DATETIME,
  PRIMARY KEY (`id`),
  KEY `images_fk` (`productId`),
  CONSTRAINT `images_fk` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) 



CREATE TABLE `product_purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(6,2) DEFAULT NULL,
  `quantity` decimal(6,2) DEFAULT NULL,
  `productId` int(11) NOT NULL,
  `purchaseId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_purchase_fk` (`productId`),
  KEY `product_purchase_fk_1` (`purchaseId`),
  CONSTRAINT `product_purchase_fk` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `product_purchase_fk_1` FOREIGN KEY (`purchaseId`) REFERENCES `purchases` (`id`)
) 


CREATE TABLE `product_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_tag_fk` (`tagId`),
  KEY `product_tag_fk_1` (`productId`),
  CONSTRAINT `product_tag_fk` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`),
  CONSTRAINT `product_tag_fk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
)