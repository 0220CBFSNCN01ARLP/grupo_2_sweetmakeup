-- proyecto.brands definition

CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.categories definition

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.color definition

CREATE TABLE `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.tags definition

CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.users definition

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `lastName` varchar(500) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.addresses definition

CREATE TABLE `addresses` (
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
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_fk` (`user_id`),
  CONSTRAINT `addresses_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.products definition

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
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_fk` (`category_id`),
  KEY `products_fk_1` (`brand_id`),
  CONSTRAINT `products_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_fk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.purchases definition

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `total` decimal(6,2) DEFAULT NULL,
  `payment` varchar(100) DEFAULT NULL,
  `invoice` varchar(100) DEFAULT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `purchases_fk` (`address_id`),
  KEY `purchases_fk_1` (`user_id`),
  CONSTRAINT `purchases_fk` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `purchases_fk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.user_product definition

CREATE TABLE `user_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_product_fk` (`products_id`),
  KEY `user_product_fk_1` (`users_id`),
  CONSTRAINT `user_product_fk` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `user_product_fk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.color_product definition

CREATE TABLE `color_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `color_product_fk` (`color_id`),
  KEY `color_product_fk_1` (`product_id`),
  CONSTRAINT `color_product_fk` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
  CONSTRAINT `color_product_fk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.images definition

CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `route` varchar(500) NOT NULL,
  `size` varchar(500) DEFAULT NULL,
  `fileType` varchar(500) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `images_fk` (`product_id`),
  CONSTRAINT `images_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.product_purchase definition

CREATE TABLE `product_purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_purchase_fk` (`product_id`),
  KEY `product_purchase_fk_1` (`purchase_id`),
  CONSTRAINT `product_purchase_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_purchase_fk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- proyecto.product_tag definition

CREATE TABLE `product_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_tag_fk` (`tag_id`),
  KEY `product_tag_fk_1` (`product_id`),
  CONSTRAINT `product_tag_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  CONSTRAINT `product_tag_fk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;