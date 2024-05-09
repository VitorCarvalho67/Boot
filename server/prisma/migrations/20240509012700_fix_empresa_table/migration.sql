-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `token` VARCHAR(191) NULL,
    MODIFY `endereco` VARCHAR(191) NULL,
    MODIFY `telefone` VARCHAR(191) NULL;
