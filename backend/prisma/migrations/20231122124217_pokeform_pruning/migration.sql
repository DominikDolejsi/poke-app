/*
  Warnings:

  - You are about to drop the column `gender` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `pokemonform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pokemonform` DROP COLUMN `gender`,
    DROP COLUMN `species`;
