import prisma from "@/backend/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function funciones(req: NextApiRequest, res:NextApiResponse) {
    if (req.method === 'GET'){
        const historial = await prisma.log.findMany();
        return res.status(200).json(historial);
    }

    if (req.method === 'POST'){
        const {id_productoalmacen, descripcion, fecha} = req.body;
        try {
            const nuevoLog = await prisma.log.create({
                data: {id_productoalmacen, descripcion, fecha},
            });
            return res.status(201).json(nuevoLog);
        }catch(error){
            return res.status(500).json({error: 'No se pudo crear el log'})
        }
    }

    return res.status(405).json({mensaje: 'Metodo no permitodo'});
}