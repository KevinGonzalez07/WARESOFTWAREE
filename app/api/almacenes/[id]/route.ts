// app/api/almacenes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs'

// GET: Obtener un almacén por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  // 1. Esperamos a que se resuelvan los params
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const almacen = await prisma.almacen.findUnique({
      where: { id_almacen: numericId },
      include: { productos: { include: { proveedor: true } } },
    })
    if (!almacen) {
      return NextResponse.json({ error: 'Almacén no encontrado' }, { status: 404 })
    }
    return NextResponse.json(almacen)
  } catch (error) {
    console.error('Error al obtener el almacén:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// PUT: Actualizar un almacén por ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  const { nombre, descripcion, color } = await request.json()
  if (!nombre || !descripcion || color === undefined) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  try {
    const updated = await prisma.almacen.update({
      where: { id_almacen: numericId },
      data: { nombre, descripcion, color: parseInt(color, 10) },
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Error al actualizar el almacén:', error)
    return NextResponse.json(
      { error: 'Error al actualizar', detalles: error.message },
      { status: 500 }
    )
  }
}

// DELETE: Eliminar un almacén por ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  const numericId = Number(id)
  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const deleted = await prisma.almacen.delete({ where: { id_almacen: numericId } })
    return NextResponse.json(deleted)
  } catch (error: any) {
    console.error('Error al eliminar el almacén:', error)
    return NextResponse.json(
      { error: 'No se pudo eliminar', detalles: error.message },
      { status: 500 }
    )
  }
}
