/*
  Warnings:

  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_createdId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_updatedId_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('EMPLOYEE', 'ADMIN') NOT NULL DEFAULT 'EMPLOYEE';

-- DropTable
DROP TABLE `posts`;

-- DropTable
DROP TABLE `products`;

-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `clockIn` INTEGER NOT NULL,
    `clockOut` INTEGER NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` INTEGER NOT NULL,
    `updatedAt` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
