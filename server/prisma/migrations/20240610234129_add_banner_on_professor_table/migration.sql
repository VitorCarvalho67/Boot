/*
  Warnings:

  - You are about to drop the column `adminImagem` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `alunoImagem` on the `alunos` table. All the data in the column will be lost.
  - You are about to drop the column `bannerImagem` on the `alunos` table. All the data in the column will be lost.
  - You are about to drop the column `atividadeImagem` on the `atividades` table. All the data in the column will be lost.
  - You are about to drop the column `empresaImagem` on the `empresas` table. All the data in the column will be lost.
  - You are about to drop the column `funcionarioImagem` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `professorImagem` on the `professores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admins` DROP COLUMN `adminImagem`,
    ADD COLUMN `imagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `alunos` DROP COLUMN `alunoImagem`,
    DROP COLUMN `bannerImagem`,
    ADD COLUMN `banner` VARCHAR(191) NULL,
    ADD COLUMN `imagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `atividades` DROP COLUMN `atividadeImagem`,
    ADD COLUMN `imagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `empresas` DROP COLUMN `empresaImagem`,
    ADD COLUMN `imagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `funcionarios` DROP COLUMN `funcionarioImagem`,
    ADD COLUMN `imagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `professores` DROP COLUMN `professorImagem`,
    ADD COLUMN `banner` VARCHAR(191) NULL,
    ADD COLUMN `imagem` VARCHAR(191) NULL;
