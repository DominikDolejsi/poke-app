-- DropForeignKey
ALTER TABLE `pokemonform` DROP FOREIGN KEY `PokemonForm_secondTypeId_fkey`;

-- AlterTable
ALTER TABLE `pokemonform` MODIFY `secondTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PokemonForm` ADD CONSTRAINT `PokemonForm_secondTypeId_fkey` FOREIGN KEY (`secondTypeId`) REFERENCES `PokemonType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
