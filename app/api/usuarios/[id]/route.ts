// app/api/usuarios/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/prisma';

// GET: Obtener clave del usuario
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id_usuario = parseInt(params.id);
  
  if (isNaN(id_usuario)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const user = await prisma.usuario.findUnique({
      where: { id_usuario },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// PUT: Actualizar nombre o imagen del usuario
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const body = await request.json();

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id_usuario: id },
      data: {
        nombre: body.nombre,
        imagen: body.imagenPerfil,
      },
    });

    return NextResponse.json(usuarioActualizado);
  } catch (error: any) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json({ error: 'No se pudo actualizar el usuario', detalles: error.message }, { status: 500 });
  }
}
