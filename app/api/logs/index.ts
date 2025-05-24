import prisma from "@/app/api/backend/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function funciones(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const historial = await prisma.log.findMany();
    return res.status(200).json(historial);
  }

  if (req.method === "POST") {
    const { id_producto, id_almacen, descripcion, fecha } = req.body;

    if (!id_producto || !id_almacen || !descripcion || !fecha) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
      const nuevoLog = await prisma.log.create({
        data: {
          id_producto: Number(id_producto),
          id_almacen: Number(id_almacen),
          descripcion,
          fecha: new Date(fecha),
        },
      });
      return res.status(201).json(nuevoLog);
    } catch (error) {
      console.error("Error al crear log:", error);
      return res.status(500).json({ error: "No se pudo crear el log" });
    }
  }

  return res.status(405).json({ mensaje: "Método no permitido" });
}
