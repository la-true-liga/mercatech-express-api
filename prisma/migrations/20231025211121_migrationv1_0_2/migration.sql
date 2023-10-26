/*
  Warnings:

  - The values [LACTEOS] on the enum `item_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `category` ENUM('MEAT', 'FISH', 'VEGETABLES', 'FRUITS', 'DAIRY', 'SWEETS', 'OTHERS') NOT NULL DEFAULT 'OTHERS';
