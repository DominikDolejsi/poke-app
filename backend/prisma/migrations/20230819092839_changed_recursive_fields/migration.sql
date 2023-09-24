/*
  Warnings:

  - You are about to drop the `_evolutions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_strength_weakness` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_evolutions` DROP FOREIGN KEY `_Evolutions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_evolutions` DROP FOREIGN KEY `_Evolutions_B_fkey`;

-- DropForeignKey
ALTER TABLE `_strength_weakness` DROP FOREIGN KEY `_strength_weakness_A_fkey`;

-- DropForeignKey
ALTER TABLE `_strength_weakness` DROP FOREIGN KEY `_strength_weakness_B_fkey`;

-- AlterTable
ALTER TABLE `pokemon` ADD COLUMN `nextEvolution` VARCHAR(191) NULL,
    ADD COLUMN `previousEvolution` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pokemontype` ADD COLUMN `immune` VARCHAR(191) NULL,
    ADD COLUMN `strength` VARCHAR(191) NULL,
    ADD COLUMN `weakness` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_evolutions`;

-- DropTable
DROP TABLE `_strength_weakness`;
