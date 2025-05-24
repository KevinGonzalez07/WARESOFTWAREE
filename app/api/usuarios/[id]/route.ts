// app/api/usuarios/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/api/backend/prisma'

export const runtime = 'nodejs'

// GET: Obtener datos del usuario
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  const id_usuario = parseInt(id, 10)
  if (isNaN(id_usuario)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const user = await prisma.usuario.findUnique({
      where: { id_usuario },
    })
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error al obtener usuario:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// PUT: Actualizar nombre o imagen del usuario
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  const id_usuario = parseInt(id, 10)
  if (isNaN(id_usuario)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  const { nombre, imagenPerfil } = await req.json()
  if (!nombre && !imagenPerfil) {
    return NextResponse.json(
      { error: 'Debe enviar al menos un campo para actualizar' },
      { status: 400 }
    )
  }

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id_usuario },
      data: {
        ...(nombre !== undefined && { nombre }),
        ...(imagenPerfil !== undefined && { imagen: imagenPerfil }),
      },
    })
    return NextResponse.json(usuarioActualizado)
  } catch (error: any) {
    console.error('Error al actualizar usuario:', error)
    return NextResponse.json(
      { error: 'No se pudo actualizar el usuario', detalles: error.message },
      { status: 500 }
    )
  }
}
