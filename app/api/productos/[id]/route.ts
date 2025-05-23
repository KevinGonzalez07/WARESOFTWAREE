import { NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id_producto = parseInt(params.id);

  try {
    const body = await req.json();
    const { nombre, descripcion, existencia, imagen, id_proveedor } = body;

    if (
      !nombre || !descripcion || !imagen ||
      isNaN(existencia) || isNaN(id_proveedor)
    ) {
      return NextResponse.json({ error: 'Datos inválidos o incompletos' }, { status: 400 });
    }

    const updated = await prisma.producto.update({
      where: { id_producto },
      data: {
        nombre,
        descripcion,
        existencia,
        imagen,
        id_proveedor,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id_producto = parseInt(params.id);

  if (isNaN(id_producto)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    await prisma.producto.delete({
      where: { id_producto },
    });

    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 });
  }
}
