import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/prisma';
import { RouteHandlerContext } from 'next/dist/server/future/route-handlers/route-handler';

// PUT /api/productos/[id]
export async function PUT(request: NextRequest, context: RouteHandlerContext) {
  const id_producto = parseInt(context.params.id, 10);

  if (isNaN(id_producto)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { nombre, descripcion, existencia, imagen, id_proveedor } = body;

    if (!nombre || !descripcion || !imagen || isNaN(Number(existencia)) || isNaN(Number(id_proveedor))) {
      return NextResponse.json({ error: 'Datos inválidos o incompletos' }, { status: 400 });
    }

    const updated = await prisma.producto.update({
      where: { id_producto },
      data: {
        nombre,
        descripcion,
        existencia: Number(existencia),
        imagen,
        id_proveedor: Number(id_proveedor),
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json({ error: 'Error al actualizar producto', detalles: error.message }, { status: 500 });
  }
}

// DELETE /api/productos/[id]
export async function DELETE(request: NextRequest, context: RouteHandlerContext) {
  const id_producto = parseInt(context.params.id, 10);

  if (isNaN(id_producto)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    await prisma.producto.delete({
      where: { id_producto },
    });

    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error: any) {
    console.error('Error al eliminar producto:', error);
    return NextResponse.json({ error: 'Error al eliminar producto', detalles: error.message }, { status: 500 });
  }
}
