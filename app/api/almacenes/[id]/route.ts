import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

// Función auxiliar para extraer el ID de la ruta
function getIdFromRequest(request: NextRequest): number | null {
  const idStr = request.nextUrl.pathname.split('/').pop()
  const id = Number(idStr)
  return isNaN(id) ? null : id
}

// GET
export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request)
  if (id === null) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

  try {
    const almacen = await prisma.almacen.findUnique({
      where: { id_almacen: id },
      include: {
        productos: {
          include: { proveedor: true }
        }
      }
    })
    if (!almacen) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(almacen)
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// PUT
export async function PUT(request: NextRequest) {
  const id = getIdFromRequest(request)
  if (id === null) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

  const body = await request.json()
  const { nombre, descripcion, color } = body

  if (!nombre || !descripcion || color === undefined)
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })

  try {
    const updated = await prisma.almacen.update({
      where: { id_almacen: id },
      data: { nombre, descripcion, color: parseInt(color) }
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: 'Error al actualizar', detalles: error.message }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  const id = getIdFromRequest(request)
  if (id === null) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

  try {
    const deleted = await prisma.almacen.delete({ where: { id_almacen: id } })
    return NextResponse.json(deleted)
  } catch (error: any) {
    return NextResponse.json({ error: 'No se pudo eliminar', detalles: error.message }, { status: 500 })
  }
}
