import { NextResponse } from 'next/server';
import prisma from '@/backend/prisma';

// Manejar GET request
export async function GET() {
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

// Manejar POST request
export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, clave, imagen } = body;
  const claveInt = parseInt(clave, 10);

  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        clave: claveInt,
        imagen: imagen || 'null', // Si no se proporciona imagen, se asigna null
      }
    });
    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    console.error(error); // Agregar log de error para depuración
    return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
  }
}
