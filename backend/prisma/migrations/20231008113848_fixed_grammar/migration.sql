/*
  Warnings:

  - You are about to drop the column `defence` on the `pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `specialDefence` on the `pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `defence` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `specialDefence` on the `pokemonform` table. All the data in the column will be lost.
  - Added the required column `defense` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialDefense` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pokemon` DROP COLUMN `defence`,
    DROP COLUMN `specialDefence`,
    ADD COLUMN `defense` INTEGER NOT NULL,
    ADD COLUMN `specialDefense` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pokemonform` DROP COLUMN `defence`,
    DROP COLUMN `specialDefence`,
    ADD COLUMN `defense` INTEGER NULL,
    ADD COLUMN `specialDefense` INTEGER NULL;
