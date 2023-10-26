/*
  Warnings:

  - You are about to alter the column `category` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to drop the column `compra_userId` on the `list` table. All the data in the column will be lost.
  - You are about to drop the column `despensa_userId` on the `list` table. All the data in the column will be lost.
  - The values [COMPRA,DESPENSA] on the enum `list_type` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[shopping_userId]` on the table `list` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pantry_userId]` on the table `list` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pantry_userId` to the `list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopping_userId` to the `list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `list_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `fk_list_user`;

-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `fk_list_user1`;

-- AlterTable
ALTER TABLE `item` MODIFY `category` ENUM('MEAT', 'FISH', 'VEGETABLES', 'FRUITS', 'LACTEOS', 'SWEETS', 'OTHERS') NOT NULL DEFAULT 'OTHERS';

-- AlterTable
ALTER TABLE `list` DROP COLUMN `compra_userId`,
    DROP COLUMN `despensa_userId`,
    ADD COLUMN `pantry_userId` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `shopping_userId` INTEGER UNSIGNED NOT NULL,
    MODIFY `type` ENUM('SHOPPING', 'PANTRY', 'CUSTOM') NOT NULL DEFAULT 'CUSTOM';

-- AlterTable
ALTER TABLE `list_item` ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `quantityType` ENUM('ML', 'L', 'G', 'KG', 'UNITS') NOT NULL DEFAULT 'UNITS';

-- CreateIndex
CREATE UNIQUE INDEX `shopping_userId_UNIQUE` ON `list`(`shopping_userId`);

-- CreateIndex
CREATE UNIQUE INDEX `pantry_userId_UNIQUE` ON `list`(`pantry_userId`);

-- CreateIndex
CREATE INDEX `fk_list_user1_idx` ON `list`(`pantry_userId`);

-- CreateIndex
CREATE INDEX `fk_list_user_idx` ON `list`(`shopping_userId`);

-- AddForeignKey
ALTER TABLE `list` ADD CONSTRAINT `fk_pantry_list` FOREIGN KEY (`pantry_userId`) REFERENCES `user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `list` ADD CONSTRAINT `fk_shopping_list` FOREIGN KEY (`shopping_userId`) REFERENCES `user`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
