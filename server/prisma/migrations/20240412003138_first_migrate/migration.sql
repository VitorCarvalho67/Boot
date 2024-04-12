-- CreateTable
CREATE TABLE `alunos` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `turmas` VARCHAR(191) NULL,
    `dataNascimento` VARCHAR(191) NULL,
    `disciplina` VARCHAR(191) NULL,
    `rm` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `alunos_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admins_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `turno` ENUM('MANHA', 'TARDE', 'NOITE', 'INTEGRAL') NOT NULL,
    `duracao` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `id` VARCHAR(191) NOT NULL,
    `inicio` VARCHAR(191) NOT NULL,
    `fim` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `patrocinador` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `empresas_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vagas` (
    `id` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `empresaId` VARCHAR(191) NOT NULL,
    `requisitos` VARCHAR(191) NOT NULL,
    `beneficios` VARCHAR(191) NOT NULL,
    `remuneracao` VARCHAR(191) NOT NULL,
    `cargaHoraria` VARCHAR(191) NOT NULL,
    `dataInicio` VARCHAR(191) NOT NULL,
    `dataFim` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vagas` ADD CONSTRAINT `vagas_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vagas` ADD CONSTRAINT `vagas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
