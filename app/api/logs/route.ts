import { NextResponse } from "next/server";
import prisma from "@/app/api/backend/prisma";

// GET: obtener todos los logs
export async function GET() {
  const historial = await prisma.log.findMany();
  return NextResponse.json(historial);
}

// POST: crear un nuevo log
export async function POST(request: Request) {
  const body = await request.json();
  const { id_producto, id_almacen, descripcion, fecha } = body;

  if (!id_producto || !id_almacen || !descripcion || !fecha) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  try {
    const nuevoLog = await prisma.log.create({
      data: {
        id_producto: Number(id_producto),
        id_almacen: Number(id_almacen),
        descripcion,
        fecha: new Date(fecha),
      },
    });
    return NextResponse.json(nuevoLog, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear log:", error);
    return NextResponse.json({ error: error.message || "No se pudo crear el log" }, { status: 500 });
  }
}
