CREATE TABLE `tinyapp`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(4) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `password` VARCHAR(256) NULL,
  `createdAt` TIMESTAMP NULL,
  `updatedAt` TIMESTAMP NULL,
PRIMARY KEY (`id`));

