/*
  Warnings:

  - You are about to drop the column `sprite` on the `pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `sprite` on the `pokemonform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pokemon` DROP COLUMN `sprite`;

-- AlterTable
ALTER TABLE `pokemonform` DROP COLUMN `sprite`;
