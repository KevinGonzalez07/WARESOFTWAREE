-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_id_almacen_fkey";

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE CASCADE ON UPDATE CASCADE;
