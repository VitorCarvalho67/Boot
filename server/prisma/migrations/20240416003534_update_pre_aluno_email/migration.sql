/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `pre_alunos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pre_alunos_email_key` ON `pre_alunos`(`email`);
