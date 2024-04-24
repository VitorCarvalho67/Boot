/*
  Warnings:

  - Added the required column `coordenador` to the `cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `coordenador` VARCHAR(191) NOT NULL;
