/*
  Warnings:

  - You are about to drop the column `id_productoalmacen` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `ProductoAlmacen` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `Almacen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_almacen` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_id_productoalmacen_fkey";

-- DropForeignKey
ALTER TABLE "ProductoAlmacen" DROP CONSTRAINT "ProductoAlmacen_id_almacen_fkey";

-- DropForeignKey
ALTER TABLE "ProductoAlmacen" DROP CONSTRAINT "ProductoAlmacen_id_producto_fkey";

-- AlterTable
ALTER TABLE "Almacen" ADD COLUMN     "color" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "id_productoalmacen";

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "id_almacen" INTEGER NOT NULL,
ADD COLUMN     "imagen" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "rol",
ADD COLUMN     "imagen" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductoAlmacen";

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;
