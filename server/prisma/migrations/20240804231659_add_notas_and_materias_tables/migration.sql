-- CreateTable
CREATE TABLE `materias` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos_materias` (
    `cursoId` VARCHAR(191) NOT NULL,
    `materiaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cursoId`, `materiaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas` (
    `id` VARCHAR(191) NOT NULL,
    `alunoId` VARCHAR(191) NOT NULL,
    `materiaId` VARCHAR(191) NOT NULL,
    `bimestre` INTEGER NOT NULL,
    `ano` INTEGER NOT NULL,
    `mencao` ENUM('I', 'R', 'B', 'MB') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cursos_materias` ADD CONSTRAINT `cursos_materias_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos_materias` ADD CONSTRAINT `cursos_materias_materiaId_fkey` FOREIGN KEY (`materiaId`) REFERENCES `materias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `alunos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_materiaId_fkey` FOREIGN KEY (`materiaId`) REFERENCES `materias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
