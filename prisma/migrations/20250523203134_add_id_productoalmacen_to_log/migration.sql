/*
  Warnings:

  - Added the required column `id_productoalmacen` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "id_productoalmacen" INTEGER NOT NULL;
