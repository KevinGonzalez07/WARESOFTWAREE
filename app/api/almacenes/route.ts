import { NextResponse } from "next/server";
import prisma from "@/backend/prisma";

// GET /api/almacenes
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_usuario = parseInt(searchParams.get("id_usuario") || "", 10);

  try {
    const almacenes = await prisma.almacen.findMany({
      where: { id_usuario },
      include: {
        productos: {
          include: {
            proveedor: true,
          },
        },
      },
    });

    return NextResponse.json(almacenes);
  } catch (error) {
    console.error("Error al obtener almacenes:", error);
    return NextResponse.json({ error: "Error al obtener almacenes" }, { status: 500 });
  }
}

// POST /api/almacenes
export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, descripcion, id_usuario, color } = body;

  if (!nombre || !descripcion || id_usuario === undefined || color === undefined) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const idUsuarioParsed = parseInt(id_usuario);
  const colorParsed = parseInt(color);

  if (isNaN(idUsuarioParsed) || isNaN(colorParsed)) {
    return NextResponse.json({ error: "id_usuario y color deben ser números válidos" }, { status: 400 });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id_usuario: idUsuarioParsed },
    });

    if (!usuarioExistente) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const nuevoAlmacen = await prisma.almacen.create({
      data: {
        nombre,
        descripcion,
        color: colorParsed,
        id_usuario: idUsuarioParsed,
      },
    });

    return NextResponse.json(nuevoAlmacen, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear almacén:", error);
    return NextResponse.json({ error: "Error al crear el almacén", detalles: error.message }, { status: 500 });
  }
}
