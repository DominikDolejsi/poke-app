/*
  Warnings:

  - You are about to drop the `_pokemonformtolistentities` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `PokemonType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_pokemonformtolistentities` DROP FOREIGN KEY `_PokemonFormTolistEntities_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pokemonformtolistentities` DROP FOREIGN KEY `_PokemonFormTolistEntities_B_fkey`;

-- DropForeignKey
ALTER TABLE `listentities` DROP FOREIGN KEY `listEntities_listId_fkey`;

-- DropForeignKey
ALTER TABLE `listentities` DROP FOREIGN KEY `listEntities_pokemonId_fkey`;

-- AlterTable
ALTER TABLE `pokemon` MODIFY `artworkMale` VARCHAR(191) NULL,
    MODIFY `artworkFemale` VARCHAR(191) NULL,
    MODIFY `artworkMaleShiny` VARCHAR(191) NULL,
    MODIFY `artworkFemaleShiny` VARCHAR(191) NULL,
    MODIFY `homeSprite` VARCHAR(191) NULL,
    MODIFY `homeSpriteShiny` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_pokemonformtolistentities`;

-- CreateTable
CREATE TABLE `_ListEntitiesToPokemonForm` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ListEntitiesToPokemonForm_AB_unique`(`A`, `B`),
    INDEX `_ListEntitiesToPokemonForm_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `PokemonType_name_key` ON `PokemonType`(`name`);

-- AddForeignKey
ALTER TABLE `ListEntities` ADD CONSTRAINT `ListEntities_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListEntities` ADD CONSTRAINT `ListEntities_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListEntitiesToPokemonForm` ADD CONSTRAINT `_ListEntitiesToPokemonForm_A_fkey` FOREIGN KEY (`A`) REFERENCES `ListEntities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListEntitiesToPokemonForm` ADD CONSTRAINT `_ListEntitiesToPokemonForm_B_fkey` FOREIGN KEY (`B`) REFERENCES `PokemonForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
