import prisma from "@/backend/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function funciones (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET'){
        const productos = await prisma.almacen.findMany();
        return res.status(200).json(productos);
    }

    if (req.method === 'POST'){
        const {nombre, descripcion, existencia, id_proveedor} = req.body;
        try{
            const nuevoProducto = await prisma.producto.create({
                data: {nombre, descripcion, existencia, id_proveedor},
            });
            return res.status(201).json(nuevoProducto);
        }catch (error){
            return res.status(500).json({error: 'No se pudo almacenar el producto'});
        }
    }
    return res.status(405).json({mensaje: 'Método no permitido'});
}