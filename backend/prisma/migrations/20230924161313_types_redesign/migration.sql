/*
  Warnings:

  - You are about to drop the `_pokemonformtopokemontype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_pokemontopokemontype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstTypeId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondTypeId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstTypeId` to the `PokemonForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondTypeId` to the `PokemonForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_pokemonformtopokemontype` DROP FOREIGN KEY `_PokemonFormToPokemonType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pokemonformtopokemontype` DROP FOREIGN KEY `_PokemonFormToPokemonType_B_fkey`;

-- DropForeignKey
ALTER TABLE `_pokemontopokemontype` DROP FOREIGN KEY `_PokemonToPokemonType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pokemontopokemontype` DROP FOREIGN KEY `_PokemonToPokemonType_B_fkey`;

-- AlterTable
ALTER TABLE `pokemon` ADD COLUMN `firstTypeId` INTEGER NOT NULL,
    ADD COLUMN `secondTypeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pokemonform` ADD COLUMN `firstTypeId` INTEGER NOT NULL,
    ADD COLUMN `secondTypeId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_pokemonformtopokemontype`;

-- DropTable
DROP TABLE `_pokemontopokemontype`;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_firstTypeId_fkey` FOREIGN KEY (`firstTypeId`) REFERENCES `PokemonType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_secondTypeId_fkey` FOREIGN KEY (`secondTypeId`) REFERENCES `PokemonType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonForm` ADD CONSTRAINT `PokemonForm_firstTypeId_fkey` FOREIGN KEY (`firstTypeId`) REFERENCES `PokemonType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonForm` ADD CONSTRAINT `PokemonForm_secondTypeId_fkey` FOREIGN KEY (`secondTypeId`) REFERENCES `PokemonType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
