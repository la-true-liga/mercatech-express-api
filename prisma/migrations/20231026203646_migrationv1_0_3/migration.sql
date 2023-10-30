ALTER TABLE `list_item` DROP FOREIGN KEY `fk_list_has_item_item1`;

-- AlterTable
ALTER TABLE `item` MODIFY `itemId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `list_item` ADD CONSTRAINT `fk_list_has_item_item1` FOREIGN KEY (`list_item_itemId`) REFERENCES `item`(`itemId`);

