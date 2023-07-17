-- CreateTable
CREATE TABLE `listEntities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listId` INTEGER NOT NULL,
    `pokemonId` INTEGER NULL,
    `pokemonGender` BOOLEAN NULL,
    `formGender` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `gender` BOOLEAN NOT NULL,
    `nationalNumber` INTEGER NOT NULL,
    `generation` INTEGER NOT NULL,
    `health` INTEGER NOT NULL,
    `speed` INTEGER NOT NULL,
    `attack` INTEGER NOT NULL,
    `defence` INTEGER NOT NULL,
    `specialAttack` INTEGER NOT NULL,
    `specialDefence` INTEGER NOT NULL,
    `artworkMale` VARCHAR(191) NOT NULL,
    `artworkFemale` VARCHAR(191) NOT NULL,
    `artworkMaleShiny` VARCHAR(191) NOT NULL,
    `artworkFemaleShiny` VARCHAR(191) NOT NULL,
    `homeSprite` VARCHAR(191) NOT NULL,
    `homeSpriteShiny` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Pokemon_nationalNumber_key`(`nationalNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemonId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `formTypeId` INTEGER NOT NULL,
    `species` VARCHAR(191) NULL,
    `gender` BOOLEAN NULL,
    `generation` INTEGER NULL,
    `health` INTEGER NULL,
    `speed` INTEGER NULL,
    `attack` INTEGER NULL,
    `defence` INTEGER NULL,
    `specialAttack` INTEGER NULL,
    `specialDefence` INTEGER NULL,
    `artworkMale` VARCHAR(191) NULL,
    `artworkFemale` VARCHAR(191) NULL,
    `artworkMaleShiny` VARCHAR(191) NULL,
    `artworkFemaleShiny` VARCHAR(191) NULL,
    `homeSprite` VARCHAR(191) NULL,
    `homeSpriteShiny` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `PokemonForm_formTypeId_key`(`formTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PokemonToPokemonType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PokemonToPokemonType_AB_unique`(`A`, `B`),
    INDEX `_PokemonToPokemonType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Evolutions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Evolutions_AB_unique`(`A`, `B`),
    INDEX `_Evolutions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PokemonFormToPokemonType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PokemonFormToPokemonType_AB_unique`(`A`, `B`),
    INDEX `_PokemonFormToPokemonType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PokemonFormTolistEntities` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PokemonFormTolistEntities_AB_unique`(`A`, `B`),
    INDEX `_PokemonFormTolistEntities_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GameToPokemon` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GameToPokemon_AB_unique`(`A`, `B`),
    INDEX `_GameToPokemon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GameToPokemonForm` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_GameToPokemonForm_AB_unique`(`A`, `B`),
    INDEX `_GameToPokemonForm_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_strength_weakness` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_strength_weakness_AB_unique`(`A`, `B`),
    INDEX `_strength_weakness_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `listEntities` ADD CONSTRAINT `listEntities_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `listEntities` ADD CONSTRAINT `listEntities_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonForm` ADD CONSTRAINT `PokemonForm_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonForm` ADD CONSTRAINT `PokemonForm_formTypeId_fkey` FOREIGN KEY (`formTypeId`) REFERENCES `FormType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PokemonToPokemonType` ADD CONSTRAINT `_PokemonToPokemonType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PokemonToPokemonType` ADD CONSTRAINT `_PokemonToPokemonType_B_fkey` FOREIGN KEY (`B`) REFERENCES `PokemonType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Evolutions` ADD CONSTRAINT `_Evolutions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Evolutions` ADD CONSTRAINT `_Evolutions_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PokemonFormToPokemonType` ADD CONSTRAINT `_PokemonFormToPokemonType_A_fkey` FOREIGN KEY (`A`) REFERENCES `PokemonForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PokemonFormToPokemonType` ADD CONSTRAINT `_PokemonFormToPokemonType_B_fkey` FOREIGN KEY (`B`) REFERENCES `PokemonType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PokemonFormTolistEntities` ADD CONSTRAINT `_PokemonFormTolistEntities_A_fkey` FOREIGN KEY (`A`) REFERENCES `PokemonForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PokemonFormTolistEntities` ADD CONSTRAINT `_PokemonFormTolistEntities_B_fkey` FOREIGN KEY (`B`) REFERENCES `listEntities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToPokemon` ADD CONSTRAINT `_GameToPokemon_A_fkey` FOREIGN KEY (`A`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToPokemon` ADD CONSTRAINT `_GameToPokemon_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToPokemonForm` ADD CONSTRAINT `_GameToPokemonForm_A_fkey` FOREIGN KEY (`A`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToPokemonForm` ADD CONSTRAINT `_GameToPokemonForm_B_fkey` FOREIGN KEY (`B`) REFERENCES `PokemonForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_strength_weakness` ADD CONSTRAINT `_strength_weakness_A_fkey` FOREIGN KEY (`A`) REFERENCES `PokemonType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_strength_weakness` ADD CONSTRAINT `_strength_weakness_B_fkey` FOREIGN KEY (`B`) REFERENCES `PokemonType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
