-- AlterTable
ALTER TABLE `pokemon` ADD COLUMN `femaleAttack` INTEGER NULL,
    ADD COLUMN `femaleDefense` INTEGER NULL,
    ADD COLUMN `femaleHealth` INTEGER NULL,
    ADD COLUMN `femaleSpecialAttack` INTEGER NULL,
    ADD COLUMN `femaleSpecialDefense` INTEGER NULL,
    ADD COLUMN `femaleSpeed` INTEGER NULL,
    ADD COLUMN `formName` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_FormTypeToPokemon` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FormTypeToPokemon_AB_unique`(`A`, `B`),
    INDEX `_FormTypeToPokemon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FormTypeToPokemon` ADD CONSTRAINT `_FormTypeToPokemon_A_fkey` FOREIGN KEY (`A`) REFERENCES `FormType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FormTypeToPokemon` ADD CONSTRAINT `_FormTypeToPokemon_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
