import { NextResponse } from "next/server";
import prisma from "@/app/api/backend/prisma";

// GET: obtener log por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const log = await prisma.log.findUnique({
    where: { id_logs: Number(id) },
  });

  return log
    ? NextResponse.json(log)
    : NextResponse.json({ mensaje: "No se encontró el log" }, { status: 404 });
}

// PUT: actualizar log por ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const { id_producto, id_almacen, descripcion, fecha } = body;

  if (
    isNaN(Number(id_producto)) ||
    isNaN(Number(id_almacen)) ||
    !descripcion ||
    !fecha
  ) {
    return NextResponse.json({ error: "Datos inválidos o incompletos" }, { status: 400 });
  }

  try {
    const logActualizado = await prisma.log.update({
      where: { id_logs: Number(id) },
      data: {
        id_producto: Number(id_producto),
        id_almacen: Number(id_almacen),
        descripcion,
        fecha: new Date(fecha),
      },
    });
    return NextResponse.json(logActualizado);
  } catch (error: any) {
    console.error("Error al actualizar log:", error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

// DELETE: eliminar log por ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.log.delete({ where: { id_logs: Number(id) } });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error al eliminar el log" },
      { status: 500 }
    );
  }
}
