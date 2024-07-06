/*
  Warnings:

  - You are about to drop the column `dataFim` on the `vagas` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `vagas` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entrada` to the `vagas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saida` to the `vagas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vagas` DROP COLUMN `dataFim`,
    DROP COLUMN `dataInicio`,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL,
    ADD COLUMN `entrada` VARCHAR(191) NOT NULL,
    ADD COLUMN `saida` VARCHAR(191) NOT NULL;
