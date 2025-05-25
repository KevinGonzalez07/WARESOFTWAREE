import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/api/backend/prisma'

export const runtime = 'nodejs'

// GET: Obtener un log por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  try {
    const log = await prisma.log.findUnique({
      where: { id_logs: numericId },
      include: {
        producto: true,
        almacen: true,
      },
    })

    if (!log) {
      return NextResponse.json({ error: 'Log no encontrado' }, { status: 404 })
    }

    return NextResponse.json(log)
  } catch (error: any) {
    console.error('Error al obtener el log:', error)
    return NextResponse.json({ error: 'Error del servidor', detalles: error.message }, { status: 500 })
  }
}

// DELETE: Eliminar un log por ID
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
    const deleted = await prisma.log.delete({
      where: { id_logs: numericId },
    })

    return NextResponse.json(deleted)
  } catch (error: any) {
    console.error('Error al eliminar el log:', error)
    return NextResponse.json({ error: 'No se pudo eliminar', detalles: error.message }, { status: 500 })
  }
}
