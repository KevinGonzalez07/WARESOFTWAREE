import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/backend/prisma';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const { oldPin, newPin } = await request.json();

  // Buscar al usuario
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: id },
  });

  if (!usuario) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  // Verificar el PIN actual
  if (usuario.clave !== parseInt(oldPin, 10)) {
    return NextResponse.json({ error: 'PIN incorrecto' }, { status: 401 });
  }

  // Actualizar el PIN directamente (como número)
  const usuarioActualizado = await prisma.usuario.update({
    where: { id_usuario: id },
    data: { clave: parseInt(newPin, 10) },
  });

  return NextResponse.json({
    mensaje: 'PIN actualizado correctamente',
    usuario: usuarioActualizado,
  });
}
