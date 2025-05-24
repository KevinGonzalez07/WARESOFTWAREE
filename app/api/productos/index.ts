import prisma from "@/app/api/backend/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function funciones(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const productos = await prisma.producto.findMany({
                include: {
                    proveedor: true,
                    almacen: true
                }
            });
            return res.status(200).json(productos);
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
    }

    if (req.method === 'POST') {
        const { nombre, descripcion, existencia, imagen, id_proveedor, id_almacen } = req.body;

        if (!nombre || !descripcion || !existencia || !imagen || !id_proveedor || !id_almacen) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        try {
            const nuevoProducto = await prisma.producto.create({
                data: {
                    nombre,
                    descripcion,
                    existencia,
                    imagen,
                    id_proveedor: Number(id_proveedor),
                    id_almacen: Number(id_almacen)
                }
            });
            return res.status(201).json(nuevoProducto);
        } catch (error) {
            return res.status(500).json({ error: 'No se pudo almacenar el producto' });
        }
    }

    return res.status(405).json({ mensaje: 'Método no permitido' });
}
