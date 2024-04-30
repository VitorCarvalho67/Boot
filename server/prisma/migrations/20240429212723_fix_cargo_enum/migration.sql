/*
  Warnings:

  - The values [ADMINTRACAO] on the enum `funcionarios_cargo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `funcionarios` MODIFY `cargo` ENUM('GESTAO', 'ADMINISTRACAO', 'DIRECAO', 'ORIENTACAO') NOT NULL;
