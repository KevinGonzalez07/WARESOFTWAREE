import prisma from "@/backend/prisma";
import type {NextApiRequest, NextApiResponse}from 'next'

export default async function funcionesId(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;

    if (req.method === 'GET'){
        const historial = await prisma.log.findUnique({where: {id_logs: Number(id)}});
        return historial
            ? res.status(200).json(historial)
            : res.status(404).json({mensaje: 'No se encontro el log'})
    }

    if (req.method === 'PUT'){
        const {id_productoalmacen, descripcion, fecha} = req.body;
        try{
            const logActualizado = await prisma.log.update({
                where: {id_logs: Number(id)},
                data: {id_productoalmacen, descripcion, fecha }       
            });
            return res.status(200).json(logActualizado);
        }catch (error){
            return res.status(500).json({error: 'Error al actualizar'});
        }
    }

    if (req.method === 'DELETE'){
        try {
            await prisma.log.delete({where: {id_logs: Number(id)}});
            return res.status(204).end();
        }catch(error){
            return res.status(500).json({error: 'Error al momento de eliminar el log'})
        }
    }
    return res.status(405).json({mensaje: 'Metodo no permitido'});
}