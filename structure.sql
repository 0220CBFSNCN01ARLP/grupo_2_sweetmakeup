CREATE DATABASE `PROYECTO`

CREATE TABLE proyecto.brands (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 


CREATE TABLE proyecto.categories (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) 


CREATE TABLE proyecto.colors (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) 


CREATE TABLE proyecto.tags (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) 


CREATE TABLE proyecto.users (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `last_name` varchar(500) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 


CREATE TABLE proyecto.addresses (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `street` varchar(100) DEFAULT NULL,
  `number` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `zipcode` varchar(100) DEFAULT NULL,
  `floor` varchar(100) DEFAULT NULL,
  `apartment` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `neighborhood` varchar(100) DEFAULT NULL,
  `observations` varchar(100) DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_fk` (`users_id`),
  CONSTRAINT `addresses_fk` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) 


CREATE TABLE proyecto.products (
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
  `brands_id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_fk` (`categories_id`),
  KEY `products_fk_1` (`brands_id`),
  CONSTRAINT `products_fk` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_fk_1` FOREIGN KEY (`brands_id`) REFERENCES `brands` (`id`)
) 


CREATE TABLE proyecto.purchases (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `payment` varchar(100) DEFAULT NULL,
  `invoice` varchar(100) DEFAULT NULL,
  `addresses_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `purchases_fk` (`addresses_id`),
  KEY `purchases_fk_1` (`users_id`),
  CONSTRAINT `purchases_fk` FOREIGN KEY (`addresses_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `purchases_fk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) 


CREATE TABLE proyecto.user_product (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_product_fk` (`products_id`),
  KEY `user_product_fk_1` (`users_id`),
  CONSTRAINT `user_product_fk` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `user_product_fk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) 


CREATE TABLE proyecto.color_product (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `colors_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `color_product_fk` (`colors_id`),
  KEY `color_product_fk_1` (`products_id`),
  CONSTRAINT `color_product_fk` FOREIGN KEY (`colors_id`) REFERENCES `colors` (`id`),
  CONSTRAINT `color_product_fk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`)
) 


CREATE TABLE proyecto.images (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `route` varchar(500) NOT NULL,
  `size` varchar(500) DEFAULT NULL,
  `fileType` varchar(500) DEFAULT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `images_fk` (`products_id`),
  CONSTRAINT `images_fk` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`)
) 


CREATE TABLE proyecto.product_purchase (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_ids` int(11) NOT NULL,
  `product_ids` int(11) NOT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `quantity` decimal(6,2) DEFAULT NULL,
  `products_id` int(11) NOT NULL,
  `purchases_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_purchase_fk` (`products_id`),
  KEY `product_purchase_fk_1` (`purchases_id`),
  CONSTRAINT `product_purchase_fk` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_purchase_fk_1` FOREIGN KEY (`purchases_id`) REFERENCES `purchases` (`id`)
) 


CREATE TABLE proyecto.product_tag (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tags_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_tag_fk` (`tags_id`),
  KEY `product_tag_fk_1` (`products_id`),
  CONSTRAINT `product_tag_fk` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`),
  CONSTRAINT `product_tag_fk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`)
)