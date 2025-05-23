import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

// Función para extraer el ID desde la URL
function getIdFromRequest(request: NextRequest): number | null {
  const idStr = request.nextUrl.pathname.split('/').pop()
  const id = Number(idStr)
  return isNaN(id) ? null : id
}

export async function PUT(request: NextRequest) {
  const id = getIdFromRequest(request)
  if (id === null) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const { oldPin, newPin } = await request.json()

    // Buscar al usuario
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: id },
    })

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Verificar el PIN actual
    if (usuario.clave !== parseInt(oldPin, 10)) {
      return NextResponse.json({ error: 'PIN incorrecto' }, { status: 401 })
    }

    // Actualizar el PIN
    const usuarioActualizado = await prisma.usuario.update({
      where: { id_usuario: id },
      data: { clave: parseInt(newPin, 10) },
    })

    return NextResponse.json({
      mensaje: 'PIN actualizado correctamente',
      usuario: usuarioActualizado,
    })
  } catch (error) {
    console.error('Error al actualizar PIN:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
