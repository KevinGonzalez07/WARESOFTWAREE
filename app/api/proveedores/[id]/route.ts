import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

// Extraer ID de la URL
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
    const body = await request.json()
    const { nombre, direccion, telefono } = body

    if (!nombre || !direccion || !telefono) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const updatedProveedor = await prisma.proveedor.update({
      where: { id_proveedor: id },
      data: { nombre, direccion, telefono },
    })

    return NextResponse.json(updatedProveedor)
  } catch (error) {
    console.error('Error al actualizar proveedor:', error)
    return NextResponse.json({ error: 'Error al actualizar proveedor' }, { status: 500 })
  }
}
