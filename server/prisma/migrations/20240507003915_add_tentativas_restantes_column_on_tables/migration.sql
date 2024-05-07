-- AlterTable
ALTER TABLE `alunos` ADD COLUMN `tentativasRestantes` INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE `funcionarios` ADD COLUMN `recoveryPass` VARCHAR(191) NULL,
    ADD COLUMN `tentativasRestantes` INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE `professores` ADD COLUMN `recoveryPass` VARCHAR(191) NULL,
    ADD COLUMN `tentativasRestantes` INTEGER NOT NULL DEFAULT 5;
