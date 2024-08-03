-- CreateTable
CREATE TABLE `boletins` (
    `id` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `caminho` VARCHAR(191) NOT NULL,
    `status` ENUM('EM_ANALISE', 'RECUSADO', 'APROVADO') NOT NULL DEFAULT 'EM_ANALISE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `boletins` ADD CONSTRAINT `boletins_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
