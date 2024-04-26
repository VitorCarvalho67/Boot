/*
  Warnings:

  - You are about to drop the column `titulo_principal` on the `professores` table. All the data in the column will be lost.
  - Added the required column `tituloPrincipal` to the `professores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professores` DROP COLUMN `titulo_principal`,
    ADD COLUMN `tituloPrincipal` VARCHAR(191) NOT NULL;
