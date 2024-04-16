/*
  Warnings:

  - You are about to drop the column `tentativas` on the `pre_alunos` table. All the data in the column will be lost.
  - Added the required column `name` to the `pre_alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `pre_alunos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pre_alunos` DROP COLUMN `tentativas`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `tentativasRestantes` INTEGER NOT NULL DEFAULT 5;
