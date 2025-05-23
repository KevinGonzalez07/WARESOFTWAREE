import { NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

export async function GET() {
  try {
    const proveedores = await prisma.proveedor.findMany()
    return NextResponse.json(proveedores)
  } catch (error) {
    console.error('Error fetching proveedores:', error)
    return NextResponse.json({ error: 'Error fetching providers' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nombre, direccion, telefono } = body

    if (!nombre || !direccion || !telefono) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const nuevoProveedor = await prisma.proveedor.create({
      data: {
        nombre,
        direccion,
        telefono,
      },
    })

    return NextResponse.json(nuevoProveedor)
  } catch (error) {
    console.error('Error creando proveedor:', error)
    return NextResponse.json({ error: 'Error creando proveedor' }, { status: 500 })
  }
}
