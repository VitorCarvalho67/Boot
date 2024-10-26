-- CreateTable
CREATE TABLE `notificacoes` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `criadorId` VARCHAR(191) NOT NULL,
    `recipientEmails` JSON NOT NULL,
    `tipo` ENUM('MENSAGEM', 'SOLICITACAO', 'ESTAGIO', 'ATVIDADE') NOT NULL,
    `dispensada` BOOLEAN NOT NULL DEFAULT false,
    `mensagemId` VARCHAR(191) NULL,
    `estagioId` VARCHAR(191) NULL,
    `vinculoId` VARCHAR(191) NULL,
    `criador` ENUM('ALUNO', 'EMPRESA', 'FUNCIONARIO', 'PROFESSOR') NOT NULL,
    `receptor` ENUM('ALUNO', 'EMPRESA', 'FUNCIONARIO', 'PROFESSOR') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notificacoes` ADD CONSTRAINT `notificacoes_mensagemId_fkey` FOREIGN KEY (`mensagemId`) REFERENCES `mensagens`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificacoes` ADD CONSTRAINT `notificacoes_estagioId_fkey` FOREIGN KEY (`estagioId`) REFERENCES `vagas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notificacoes` ADD CONSTRAINT `notificacoes_vinculoId_fkey` FOREIGN KEY (`vinculoId`) REFERENCES `vinculos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
