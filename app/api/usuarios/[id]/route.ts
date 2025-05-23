import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

// Función auxiliar para obtener el ID desde la URL
function getIdFromRequest(request: NextRequest): number | null {
  const idStr = request.nextUrl.pathname.split('/').pop()
  const id = Number(idStr)
  return isNaN(id) ? null : id
}

// GET: Obtener clave del usuario
export async function GET(request: NextRequest) {
  const id_usuario = getIdFromRequest(request)
  
  if (id_usuario === null) {
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
export async function PUT(request: NextRequest) {
  const id = getIdFromRequest(request)

  if (id === null) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { nombre, imagenPerfil } = body

    const usuarioActualizado = await prisma.usuario.update({
      where: { id_usuario: id },
      data: {
        nombre,
        imagen: imagenPerfil,
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
