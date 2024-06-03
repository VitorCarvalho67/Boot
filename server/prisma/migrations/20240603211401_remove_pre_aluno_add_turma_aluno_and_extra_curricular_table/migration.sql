/*
  Warnings:

  - You are about to drop the column `turmas` on the `alunos` table. All the data in the column will be lost.
  - You are about to drop the `pre_alunos` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `alunos` DROP COLUMN `turmas`,
    ADD COLUMN `token` VARCHAR(191) NULL,
    ADD COLUMN `validated` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `pre_alunos`;

-- CreateTable
CREATE TABLE `alunos_turmas` (
    `alunoId` VARCHAR(191) NOT NULL,
    `turmaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`alunoId`, `turmaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `extracurriculares` (
    `extracurricularId` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NOT NULL,
    `instituicao` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `inicio` DATETIME(3) NOT NULL,
    `fim` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`extracurricularId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alunos_turmas` ADD CONSTRAINT `alunos_turmas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunos_turmas` ADD CONSTRAINT `alunos_turmas_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `extracurriculares` ADD CONSTRAINT `extracurriculares_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
