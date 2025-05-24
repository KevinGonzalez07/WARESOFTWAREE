// app/api/usuarios/[id]/pin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/api/backend/prisma'

export const runtime = 'nodejs'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  // 1. Esperamos a que se resuelvan los params
  const { id } = await params
  const numericId = parseInt(id, 10)
  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  // 2. Extraemos oldPin y newPin del body
  const { oldPin, newPin } = await request.json()
  const oldPinNum = parseInt(oldPin, 10)
  const newPinNum = parseInt(newPin, 10)
  if (isNaN(oldPinNum) || isNaN(newPinNum)) {
    return NextResponse.json({ error: 'PINs inválidos' }, { status: 400 })
  }

  // 3. Buscar al usuario
  const usuario = await prisma.usuario.findUnique({
    where: { id_usuario: numericId },
  })
  if (!usuario) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
  }

  // 4. Verificar el PIN actual
  if (usuario.clave !== oldPinNum) {
    return NextResponse.json({ error: 'PIN incorrecto' }, { status: 401 })
  }

  // 5. Actualizar el PIN
  const usuarioActualizado = await prisma.usuario.update({
    where: { id_usuario: numericId },
    data: { clave: newPinNum },
  })

  return NextResponse.json(
    {
      mensaje: 'PIN actualizado correctamente',
      usuario: usuarioActualizado,
    },
    { status: 200 }
  )
}
