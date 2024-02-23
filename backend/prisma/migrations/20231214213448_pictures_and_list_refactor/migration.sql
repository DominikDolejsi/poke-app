/*
  Warnings:

  - You are about to drop the column `formGender` on the `listentity` table. All the data in the column will be lost.
  - You are about to drop the column `pokemonGender` on the `listentity` table. All the data in the column will be lost.
  - You are about to drop the column `artworkSprite` on the `pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `artworkSpriteShiny` on the `pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `miniSprite` on the `pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `artworkSprite` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `artworkSpriteShiny` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `miniSprite` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the `_listentitytopokemonform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_listentitytopokemonform` DROP FOREIGN KEY `_ListEntityToPokemonForm_A_fkey`;

-- DropForeignKey
ALTER TABLE `_listentitytopokemonform` DROP FOREIGN KEY `_ListEntityToPokemonForm_B_fkey`;

-- AlterTable
ALTER TABLE `listentity` DROP COLUMN `formGender`,
    DROP COLUMN `pokemonGender`,
    ADD COLUMN `formId` INTEGER NULL,
    ADD COLUMN `gender` BOOLEAN NULL,
    ADD COLUMN `shiny` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `pokemon` DROP COLUMN `artworkSprite`,
    DROP COLUMN `artworkSpriteShiny`,
    DROP COLUMN `miniSprite`,
    ADD COLUMN `artworkFemale` VARCHAR(191) NULL,
    ADD COLUMN `artworkFemaleShiny` VARCHAR(191) NULL,
    ADD COLUMN `artworkMale` VARCHAR(191) NULL,
    ADD COLUMN `artworkMaleShiny` VARCHAR(191) NULL,
    ADD COLUMN `sprite` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pokemonform` DROP COLUMN `artworkSprite`,
    DROP COLUMN `artworkSpriteShiny`,
    DROP COLUMN `miniSprite`,
    ADD COLUMN `artworkFemale` VARCHAR(191) NULL,
    ADD COLUMN `artworkFemaleShiny` VARCHAR(191) NULL,
    ADD COLUMN `artworkMale` VARCHAR(191) NULL,
    ADD COLUMN `artworkMaleShiny` VARCHAR(191) NULL,
    ADD COLUMN `sprite` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_listentitytopokemonform`;

-- AddForeignKey
ALTER TABLE `ListEntity` ADD CONSTRAINT `ListEntity_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `PokemonForm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
