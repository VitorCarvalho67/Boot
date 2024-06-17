-- CreateTable
CREATE TABLE `mensagens` (
    `id` VARCHAR(191) NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,
    `alunoRemetenteId` VARCHAR(191) NULL,
    `alunoDestinatarioId` VARCHAR(191) NULL,
    `professorRemetenteId` VARCHAR(191) NULL,
    `professorDestinatarioId` VARCHAR(191) NULL,
    `funcionarioRemetenteId` VARCHAR(191) NULL,
    `funcionarioDestinatarioId` VARCHAR(191) NULL,
    `empresaRemetenteId` VARCHAR(191) NULL,
    `empresaDestinatarioId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `alunoRemetente_FK` FOREIGN KEY (`alunoRemetenteId`) REFERENCES `alunos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `alunoDestinatario_FK` FOREIGN KEY (`alunoDestinatarioId`) REFERENCES `alunos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `professorRemetente_FK` FOREIGN KEY (`professorRemetenteId`) REFERENCES `professores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `professorDestinatario_FK` FOREIGN KEY (`professorDestinatarioId`) REFERENCES `professores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `funcionarioRemetente_FK` FOREIGN KEY (`funcionarioRemetenteId`) REFERENCES `funcionarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `funcionarioDestinatario_FK` FOREIGN KEY (`funcionarioDestinatarioId`) REFERENCES `funcionarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `empresaRemetente_FK` FOREIGN KEY (`empresaRemetenteId`) REFERENCES `empresas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mensagens` ADD CONSTRAINT `empresaDestinatario_FK` FOREIGN KEY (`empresaDestinatarioId`) REFERENCES `empresas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
