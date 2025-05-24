/*
  Warnings:

  - Added the required column `id_almacen` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_producto` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "id_almacen" INTEGER NOT NULL,
ADD COLUMN     "id_producto" INTEGER NOT NULL;
