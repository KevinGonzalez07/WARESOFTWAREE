import { NextResponse } from "next/server";
import prisma from "@/app/api/backend/prisma";

// Obtener un log por ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const historial = await prisma.log.findUnique({
    where: { id_logs: Number(id) },
  });

  return historial
    ? NextResponse.json(historial)
    : NextResponse.json({ mensaje: "No se encontró el log" }, { status: 404 });
}

// Actualizar un log por ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

// Eliminar un log por ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.log.delete({ where: { id_logs: Number(id) } });
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error al momento de eliminar el log" }, { status: 500 });
  }
}
