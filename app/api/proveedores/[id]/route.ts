import { NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)

  try {
    const body = await req.json()
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
