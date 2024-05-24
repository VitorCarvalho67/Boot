/*
  Warnings:

  - A unique constraint covering the columns `[rm]` on the table `alunos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `vinculos` ADD COLUMN `accepted` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `alunos_rm_key` ON `alunos`(`rm`);
