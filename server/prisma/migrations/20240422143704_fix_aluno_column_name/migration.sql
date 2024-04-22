/*
  Warnings:

  - You are about to drop the column `recoverypass` on the `alunos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `alunos` DROP COLUMN `recoverypass`,
    ADD COLUMN `recoveryPass` VARCHAR(191) NULL;
