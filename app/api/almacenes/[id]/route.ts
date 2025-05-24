import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const almacen = await prisma.almacen.findUnique({
      where: { id_almacen: id },
      include: { productos: { include: { proveedor: true } } },
    });

    if (!almacen) {
      return NextResponse.json({ error: 'Almacén no encontrado' }, { status: 404 });
    }

    return NextResponse.json(almacen);
  } catch (error) {
    console.error('Error al obtener el almacén:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  const { nombre, descripcion, color } = await request.json();
  if (!nombre || !descripcion || color === undefined) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }

  try {
    const updated = await prisma.almacen.update({
      where: { id_almacen: id },
      data: { nombre, descripcion, color: parseInt(color, 10) },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error al actualizar el almacén:', error);
    return NextResponse.json(
      { error: 'Error al actualizar', detalles: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const deleted = await prisma.almacen.delete({ where: { id_almacen: id } });
    return NextResponse.json(deleted);
  } catch (error: any) {
    console.error('Error al eliminar el almacén:', error);
    return NextResponse.json(
      { error: 'No se pudo eliminar', detalles: error.message },
      { status: 500 }
    );
  }
}
