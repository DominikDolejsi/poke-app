/*
  Warnings:

  - You are about to drop the column `nationalNumber` on the `pokemon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nationalIndex]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nationalIndex` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Pokemon_nationalNumber_key` ON `pokemon`;

-- AlterTable
ALTER TABLE `pokemon` DROP COLUMN `nationalNumber`,
    ADD COLUMN `nationalIndex` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pokemon_nationalIndex_key` ON `Pokemon`(`nationalIndex`);
