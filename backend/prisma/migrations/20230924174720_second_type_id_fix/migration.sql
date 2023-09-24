-- DropForeignKey
ALTER TABLE `pokemon` DROP FOREIGN KEY `Pokemon_secondTypeId_fkey`;

-- AlterTable
ALTER TABLE `pokemon` MODIFY `secondTypeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_secondTypeId_fkey` FOREIGN KEY (`secondTypeId`) REFERENCES `PokemonType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
