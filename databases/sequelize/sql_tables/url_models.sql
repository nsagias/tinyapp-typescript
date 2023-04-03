CREATE TABLE `url_models` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `long_url` varchar(128) NOT NULL,
  `short_url` varchar(128) NOT NULL,
  `count` bigint unsigned NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `url_models_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;