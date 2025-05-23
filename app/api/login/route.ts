import { NextResponse, NextRequest } from "next/server";
import prisma from "@/backend/prisma";

export async function POST(req:Request) {
    const {nombre, clave} = await req.json();
    const claveInt = parseInt(clave, 10);

    try {
        const usuario = await prisma.usuario.findFirst({
            where: {nombre, clave: claveInt},
        })

        if (usuario){
            return NextResponse.json({message: 'Bienvenido', usuario}, {status: 200});
        }else{
            return NextResponse.json({ error: 'Credenciales incorrectas'},{status: 401});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error al verificar el usuario'}, {status: 500 });
    }
}