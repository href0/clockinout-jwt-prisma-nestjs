/*
  Warnings:

  - You are about to drop the column `createdBy` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `products` table. All the data in the column will be lost.
  - Added the required column `createdId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_createdBy_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_updatedBy_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `createdBy`,
    DROP COLUMN `updatedBy`,
    ADD COLUMN `createdId` INTEGER NOT NULL,
    ADD COLUMN `updatedId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_createdId_fkey` FOREIGN KEY (`createdId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_updatedId_fkey` FOREIGN KEY (`updatedId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
