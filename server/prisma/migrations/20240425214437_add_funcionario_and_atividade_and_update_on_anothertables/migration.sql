/*
  Warnings:

  - You are about to drop the column `email` on the `coordenadores` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `coordenadores` table. All the data in the column will be lost.
  - You are about to drop the column `tentativasRestantes` on the `coordenadores` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `coordenadores` table. All the data in the column will be lost.
  - You are about to drop the column `coordenador` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `tentativasRestantes` on the `professores` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `professores` table. All the data in the column will be lost.
  - Added the required column `coordenadorId` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cadastradorId` to the `vagas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `coordenadores_email_key` ON `coordenadores`;

-- AlterTable
ALTER TABLE `admins` ADD COLUMN `adminImagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `alunos` ADD COLUMN `alunoImagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `coordenadores` DROP COLUMN `email`,
    DROP COLUMN `password`,
    DROP COLUMN `tentativasRestantes`,
    DROP COLUMN `token`;

-- AlterTable
ALTER TABLE `cursos` DROP COLUMN `coordenador`,
    ADD COLUMN `coordenadorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `empresaImagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `professores` DROP COLUMN `tentativasRestantes`,
    DROP COLUMN `token`,
    ADD COLUMN `professorImagem` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vagas` ADD COLUMN `cadastradorId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `funcionarios` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `funcionarioImagem` VARCHAR(191) NULL,
    `cargo` ENUM('GESTAO', 'ADMINTRACAO', 'DIRECAO', 'ORIENTACAO') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atividades` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(1000) NOT NULL,
    `professorId` VARCHAR(191) NOT NULL,
    `atividadeImagem` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_coordenadorId_fkey` FOREIGN KEY (`coordenadorId`) REFERENCES `coordenadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vagas` ADD CONSTRAINT `vagas_cadastradorId_fkey` FOREIGN KEY (`cadastradorId`) REFERENCES `funcionarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atividades` ADD CONSTRAINT `atividades_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `professores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
