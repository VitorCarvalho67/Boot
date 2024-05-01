/*
  Warnings:

  - You are about to alter the column `dataNascimento` on the `alunos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `alunos` MODIFY `dataNascimento` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `professores` ADD COLUMN `validated` BOOLEAN NOT NULL DEFAULT false;
