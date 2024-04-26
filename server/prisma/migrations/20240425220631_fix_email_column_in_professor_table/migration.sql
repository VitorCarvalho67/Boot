/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `funcionarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `funcionarios_email_key` ON `funcionarios`(`email`);
