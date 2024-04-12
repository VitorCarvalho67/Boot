/*
  Warnings:

  - You are about to drop the column `nome` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `empresas` table. All the data in the column will be lost.
  - Added the required column `name` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `empresas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `empresas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cursos` DROP COLUMN `nome`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `empresas` DROP COLUMN `nome`,
    DROP COLUMN `senha`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
