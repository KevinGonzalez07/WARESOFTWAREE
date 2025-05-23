import prisma from "@/backend/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function funciones (req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET'){
        const proveedor = await prisma.proveedor.findMany();
        return res.status(200).json(proveedor);
    }

    if (req.method === 'POST'){
        const {nombre, direccion, telefono} = req.body;
        try{
            const nuevoProveedor = await prisma.proveedor.create({
                data: {nombre, direccion, telefono},
            });
            return res.status(201).json(nuevoProveedor);
        }catch(error){
            return res.status(500).json({error: 'No se pudo crear al proveedor'});
        }
    }

    return res.status(405).json({mensaje: 'Metodo no permitido'});
}