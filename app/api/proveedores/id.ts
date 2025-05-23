import prisma from "@/backend/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function funcionesId(req:NextApiRequest, res:NextApiResponse) {
    const {id} = req.query;

    if (req.method === 'GET'){
        const proveedor = await prisma.proveedor.findUnique ({where: {id_proveedor: Number(id)}});
        return proveedor
            ? res.status(200).json(proveedor)
            : res.status(404).json({mensaje: 'Proveedor no localizado'})
    }

    if (req.method === 'PUT') {
        const {nombre, direccion, telefono} = req.body;
        try {
          const proveedorActualizado = await prisma.proveedor.update({
            where: { id_proveedor: Number(id) },
            data: { nombre, direccion, telefono },
          });
          return res.status(200).json(proveedorActualizado);
        } catch (error) {
          return res.status(500).json({ mensaje: 'Error al actualizar proveedor', error });
        }
      }

      if (req.method === 'DELETE'){
        try {
            await prisma.proveedor.delete({where: {id_proveedor: Number(id)}});
            return res.status(204).end();
        }catch (error){
            return res.status(500).json({error: 'Error al momento de eliminar el almacen'})
        }
      }
      return res.status(405).json({mensaje: 'Metodo no permitido'})      
}