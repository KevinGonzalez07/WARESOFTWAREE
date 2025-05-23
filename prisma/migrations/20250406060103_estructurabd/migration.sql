-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "clave" INTEGER NOT NULL,
    "rol" BOOLEAN NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Almacen" (
    "id_almacen" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Almacen_pkey" PRIMARY KEY ("id_almacen")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id_producto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "existencia" INTEGER NOT NULL,
    "id_proveedor" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id_proveedor" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE "ProductoAlmacen" (
    "id_productoalmacen" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_almacen" INTEGER NOT NULL,

    CONSTRAINT "ProductoAlmacen_pkey" PRIMARY KEY ("id_productoalmacen")
);

-- CreateTable
CREATE TABLE "Log" (
    "id_logs" SERIAL NOT NULL,
    "id_productoalmacen" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id_logs")
);

-- AddForeignKey
ALTER TABLE "Almacen" ADD CONSTRAINT "Almacen_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "Proveedor"("id_proveedor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoAlmacen" ADD CONSTRAINT "ProductoAlmacen_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoAlmacen" ADD CONSTRAINT "ProductoAlmacen_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_id_productoalmacen_fkey" FOREIGN KEY ("id_productoalmacen") REFERENCES "ProductoAlmacen"("id_productoalmacen") ON DELETE RESTRICT ON UPDATE CASCADE;
