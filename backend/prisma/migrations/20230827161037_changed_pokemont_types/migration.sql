/*
  Warnings:

  - You are about to drop the column `immune` on the `pokemontype` table. All the data in the column will be lost.
  - You are about to drop the column `strength` on the `pokemontype` table. All the data in the column will be lost.
  - You are about to drop the column `weakness` on the `pokemontype` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pokemontype` DROP COLUMN `immune`,
    DROP COLUMN `strength`,
    DROP COLUMN `weakness`,
    ADD COLUMN `doubleFrom` VARCHAR(191) NULL,
    ADD COLUMN `doubleTo` VARCHAR(191) NULL,
    ADD COLUMN `halfFrom` VARCHAR(191) NULL,
    ADD COLUMN `halfTo` VARCHAR(191) NULL,
    ADD COLUMN `immuneFrom` VARCHAR(191) NULL,
    ADD COLUMN `immuneTo` VARCHAR(191) NULL;
