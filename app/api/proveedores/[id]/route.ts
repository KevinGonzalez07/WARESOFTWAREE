// app/api/proveedores/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/api/backend/prisma'

export const runtime = 'nodejs'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  const numericId = parseInt(id, 10)

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { nombre, direccion, telefono } = body

    if (!nombre || !direccion || !telefono) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    const updatedProveedor = await prisma.proveedor.update({
      where: { id_proveedor: numericId },
      data: { nombre, direccion, telefono },
    })

    return NextResponse.json(updatedProveedor)
  } catch (error: any) {
    console.error('Error al actualizar proveedor:', error)
    return NextResponse.json(
      { error: 'Error al actualizar proveedor', detalles: error.message },
      { status: 500 }
    )
  }
}
