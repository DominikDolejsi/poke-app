/*
  Warnings:

  - You are about to drop the column `artworkFemale` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `artworkFemaleShiny` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `artworkMale` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `artworkMaleShiny` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `homeSprite` on the `pokemonform` table. All the data in the column will be lost.
  - You are about to drop the column `homeSpriteShiny` on the `pokemonform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pokemonform` DROP COLUMN `artworkFemale`,
    DROP COLUMN `artworkFemaleShiny`,
    DROP COLUMN `artworkMale`,
    DROP COLUMN `artworkMaleShiny`,
    DROP COLUMN `homeSprite`,
    DROP COLUMN `homeSpriteShiny`,
    ADD COLUMN `artworkSprite` VARCHAR(191) NULL,
    ADD COLUMN `artworkSpriteShiny` VARCHAR(191) NULL,
    ADD COLUMN `homeFemale` VARCHAR(191) NULL,
    ADD COLUMN `homeFemaleShiny` VARCHAR(191) NULL,
    ADD COLUMN `homeMale` VARCHAR(191) NULL,
    ADD COLUMN `homeMaleShiny` VARCHAR(191) NULL;
