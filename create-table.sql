CREATE TABLE IF NOT EXISTS `statistics` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(45) NOT NULL,
    `country` VARCHAR(45) NOT NULL,
    `distance` INT NOT NULL,
    PRIMARY KEY(`id`)
);