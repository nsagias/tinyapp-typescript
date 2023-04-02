CREATE TABLE `tinyapp`.`shorturl` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shortendURL` VARCHAR(256) NOT NULL,
  `longURL` VARCHAR(256) NOT NULL,
  `user_id` INT NULL,
  `createdAt` TIMESTAMP NOT NULL,
  `updatedAt` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `tinyapp`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);