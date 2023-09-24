/*
  Warnings:

  - You are about to drop the `_listentitiestopokemonform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_listentitiestopokemonform` DROP FOREIGN KEY `_ListEntitiesToPokemonForm_A_fkey`;

-- DropForeignKey
ALTER TABLE `_listentitiestopokemonform` DROP FOREIGN KEY `_ListEntitiesToPokemonForm_B_fkey`;

-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `List_userId_fkey`;

-- DropForeignKey
ALTER TABLE `listentities` DROP FOREIGN KEY `ListEntities_listId_fkey`;

-- DropTable
DROP TABLE `_listentitiestopokemonform`;

-- CreateTable
CREATE TABLE `_ListEntityToPokemonForm` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ListEntityToPokemonForm_AB_unique`(`A`, `B`),
    INDEX `_ListEntityToPokemonForm_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListEntities` ADD CONSTRAINT `ListEntities_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListEntityToPokemonForm` ADD CONSTRAINT `_ListEntityToPokemonForm_A_fkey` FOREIGN KEY (`A`) REFERENCES `ListEntities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListEntityToPokemonForm` ADD CONSTRAINT `_ListEntityToPokemonForm_B_fkey` FOREIGN KEY (`B`) REFERENCES `PokemonForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
