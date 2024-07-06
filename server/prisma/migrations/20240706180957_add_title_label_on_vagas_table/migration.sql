/*
  Warnings:

  - Added the required column `titulo` to the `vagas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vagas` ADD COLUMN `titulo` VARCHAR(191) NOT NULL;
