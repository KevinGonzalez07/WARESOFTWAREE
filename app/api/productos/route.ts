// app/api/productos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/backend/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, descripcion, existencia, imagen, id_almacen, id_proveedor } = body

    if (
  typeof nombre !== 'string' || nombre.trim() === '' ||
  typeof descripcion !== 'string' || descripcion.trim() === '' ||
  typeof imagen !== 'string' || imagen.trim() === '' ||
  isNaN(Number(existencia)) ||
  isNaN(Number(id_almacen)) ||
  isNaN(Number(id_proveedor))
) {
  return NextResponse.json({ error: 'Todos los campos son obligatorios y deben tener formato válido' }, { status: 400 })
}

    const newProducto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        existencia: Number(existencia),
        imagen,
        id_almacen: Number(id_almacen),
        id_proveedor: Number(id_proveedor),
      },
    })

    return NextResponse.json(newProducto, { status: 201 })
  } catch (error) {
    console.error('Error creating producto:', error)
    return NextResponse.json({ error: 'Error al guardar el producto' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const id_almacen = parseInt(req.nextUrl.searchParams.get("id_almacen") || "", 10);

    if (isNaN(id_almacen)) {
      return NextResponse.json({ error: 'id_almacen inválido o faltante' }, { status: 400 });
    }

    const productos = await prisma.producto.findMany({
      where: { id_almacen },
      include: { proveedor: true }, // si necesitas mostrar nombre del proveedor
    });

    return NextResponse.json(productos);
  } catch (error) {
    console.error('Error fetching productos:', error);
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
  }
}
