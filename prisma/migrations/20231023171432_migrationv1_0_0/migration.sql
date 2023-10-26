-- CreateTable
CREATE TABLE `item` (
    `itemId` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `category` ENUM('CARNE', 'PESCADO', 'VERDURA', 'FRUTA', 'LACTEOS', 'DULCE', 'OTROS') NOT NULL DEFAULT 'OTROS',

    UNIQUE INDEX `itemId_UNIQUE`(`itemId`),
    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `list` (
    `listId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(35) NOT NULL DEFAULT 'Lista',
    `type` ENUM('COMPRA', 'DESPENSA', 'CUSTOM') NOT NULL DEFAULT 'CUSTOM',
    `compra_userId` INTEGER UNSIGNED NOT NULL,
    `despensa_userId` INTEGER UNSIGNED NOT NULL,
    `custom_userId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `listId_UNIQUE`(`listId`),
    INDEX `fk_list_user1_idx`(`despensa_userId`),
    INDEX `fk_list_user2_idx`(`custom_userId`),
    INDEX `fk_list_user_idx`(`compra_userId`),
    PRIMARY KEY (`listId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `list_item` (
    `list_item_listId` INTEGER UNSIGNED NOT NULL,
    `list_item_itemId` INTEGER UNSIGNED NOT NULL,

    INDEX `fk_list_has_item_item1_idx`(`list_item_itemId`),
    INDEX `fk_list_has_item_list1_idx`(`list_item_listId`),
    PRIMARY KEY (`list_item_listId`, `list_item_itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` MEDIUMTEXT NOT NULL,

    UNIQUE INDEX `userId_UNIQUE`(`userId`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `list` ADD CONSTRAINT `fk_list_user` FOREIGN KEY (`compra_userId`) REFERENCES `user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `list` ADD CONSTRAINT `fk_list_user1` FOREIGN KEY (`despensa_userId`) REFERENCES `user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `list` ADD CONSTRAINT `fk_list_user2` FOREIGN KEY (`custom_userId`) REFERENCES `user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `list_item` ADD CONSTRAINT `fk_list_has_item_item1` FOREIGN KEY (`list_item_itemId`) REFERENCES `item`(`itemId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `list_item` ADD CONSTRAINT `fk_list_has_item_list1` FOREIGN KEY (`list_item_listId`) REFERENCES `list`(`listId`) ON DELETE CASCADE ON UPDATE CASCADE;
