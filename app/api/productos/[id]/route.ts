import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

// Función auxiliar para extraer el ID de la URL
function getIdFromRequest(request: NextRequest): number | null {
  const idStr = request.nextUrl.pathname.split('/').pop()
  const id = Number(idStr)
  return isNaN(id) ? null : id
}

// PUT
export async function PUT(request: NextRequest) {
  const id_producto = getIdFromRequest(request)
  if (id_producto === null) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { nombre, descripcion, existencia, imagen, id_proveedor } = body

    if (!nombre || !descripcion || !imagen || isNaN(existencia) || isNaN(id_proveedor)) {
      return NextResponse.json({ error: 'Datos inválidos o incompletos' }, { status: 400 })
    }

    const updated = await prisma.producto.update({
      where: { id_producto },
      data: {
        nombre,
        descripcion,
        existencia,
        imagen,
        id_proveedor,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  const id_producto = getIdFromRequest(request)
  if (id_producto === null) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    await prisma.producto.delete({
      where: { id_producto },
    })

    return NextResponse.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 })
  }
}
