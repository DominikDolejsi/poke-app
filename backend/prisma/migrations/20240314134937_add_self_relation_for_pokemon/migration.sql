/*
  Warnings:

  - You are about to drop the column `nextEvolution` on the `pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `previousEvolution` on the `pokemon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pokemon` DROP COLUMN `nextEvolution`,
    DROP COLUMN `previousEvolution`,
    ADD COLUMN `previousEvolutionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_previousEvolutionId_fkey` FOREIGN KEY (`previousEvolutionId`) REFERENCES `Pokemon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
