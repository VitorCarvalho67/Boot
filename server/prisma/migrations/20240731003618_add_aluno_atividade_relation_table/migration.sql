-- CreateTable
CREATE TABLE `alunos_atividades` (
    `alunoId` VARCHAR(191) NOT NULL,
    `atividadeId` VARCHAR(191) NOT NULL,
    `mencao` ENUM('I', 'R', 'B', 'MB') NOT NULL,

    PRIMARY KEY (`alunoId`, `atividadeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alunos_atividades` ADD CONSTRAINT `alunos_atividades_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunos_atividades` ADD CONSTRAINT `alunos_atividades_atividadeId_fkey` FOREIGN KEY (`atividadeId`) REFERENCES `atividades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
