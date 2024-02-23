/*
  Warnings:

  - You are about to drop the column `formTypeId` on the `pokemonform` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pokemonform` DROP FOREIGN KEY `PokemonForm_formTypeId_fkey`;

-- AlterTable
ALTER TABLE `pokemonform` DROP COLUMN `formTypeId`;

-- CreateTable
CREATE TABLE `_FormTypeToPokemonForm` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FormTypeToPokemonForm_AB_unique`(`A`, `B`),
    INDEX `_FormTypeToPokemonForm_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FormTypeToPokemonForm` ADD CONSTRAINT `_FormTypeToPokemonForm_A_fkey` FOREIGN KEY (`A`) REFERENCES `FormType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FormTypeToPokemonForm` ADD CONSTRAINT `_FormTypeToPokemonForm_B_fkey` FOREIGN KEY (`B`) REFERENCES `PokemonForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
