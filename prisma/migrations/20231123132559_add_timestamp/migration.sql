/*
  Warnings:

  - You are about to drop the column `coba` on the `post` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `coba`,
    ADD COLUMN `createdAt` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` INTEGER NOT NULL;
