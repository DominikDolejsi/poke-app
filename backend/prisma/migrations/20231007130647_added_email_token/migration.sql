/*
  Warnings:

  - A unique constraint covering the columns `[emailToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `emailToken` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_emailToken_key` ON `User`(`emailToken`);
