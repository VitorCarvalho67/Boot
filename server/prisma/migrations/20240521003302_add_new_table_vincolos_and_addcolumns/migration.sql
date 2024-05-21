-- SQLBook: Code
/*
  Warnings:

  - You are about to drop the column `disciplina` on the `alunos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `alunos` DROP COLUMN `disciplina`,
    ADD COLUMN `bannerImagem` VARCHAR(191) NULL,
    ADD COLUMN `curriculo` VARCHAR(191) NULL,
    ADD COLUMN `endereco` VARCHAR(191) NULL,
    ADD COLUMN `sobre` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `vinculos` (
    `id` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NULL,
    `professorId` VARCHAR(191) NULL,
    `vinculoComAlunoId` VARCHAR(191) NULL,
    `vinculoComProfessorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vinculos_alunoId_professorId_vinculoComAlunoId_vinculoComPro_key`(`alunoId`, `professorId`, `vinculoComAlunoId`, `vinculoComProfessorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vinculos` ADD CONSTRAINT `vinculos_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vinculos` ADD CONSTRAINT `vinculos_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `professores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vinculos` ADD CONSTRAINT `vinculos_vinculoComAlunoId_fkey` FOREIGN KEY (`vinculoComAlunoId`) REFERENCES `alunos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vinculos` ADD CONSTRAINT `vinculos_vinculoComProfessorId_fkey` FOREIGN KEY (`vinculoComProfessorId`) REFERENCES `professores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
