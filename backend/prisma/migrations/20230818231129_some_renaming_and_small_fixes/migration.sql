/*
  Warnings:

  - You are about to drop the `listentities` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `FormType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_listentitytopokemonform` DROP FOREIGN KEY `_ListEntityToPokemonForm_A_fkey`;

-- DropForeignKey
ALTER TABLE `listentities` DROP FOREIGN KEY `ListEntities_listId_fkey`;

-- DropForeignKey
ALTER TABLE `listentities` DROP FOREIGN KEY `ListEntities_pokemonId_fkey`;

-- DropTable
DROP TABLE `listentities`;

-- CreateTable
CREATE TABLE `ListEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listId` INTEGER NOT NULL,
    `pokemonId` INTEGER NULL,
    `pokemonGender` BOOLEAN NULL,
    `formGender` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `FormType_name_key` ON `FormType`(`name`);

-- AddForeignKey
ALTER TABLE `ListEntity` ADD CONSTRAINT `ListEntity_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListEntity` ADD CONSTRAINT `ListEntity_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ListEntityToPokemonForm` ADD CONSTRAINT `_ListEntityToPokemonForm_A_fkey` FOREIGN KEY (`A`) REFERENCES `ListEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
