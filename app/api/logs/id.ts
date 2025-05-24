import prisma from "@/app/api/backend/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function funcionesId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const historial = await prisma.log.findUnique({
      where: { id_logs: Number(id) },
    });
    return historial
      ? res.status(200).json(historial)
      : res.status(404).json({ mensaje: "No se encontró el log" });
  }

  if (req.method === "PUT") {
    // 1) Extrae id_producto y id_almacen por separado
    const { id_producto, id_almacen, descripcion, fecha } = req.body;

    // 2) Valida al menos que lleguen como números válidos
    if (
      isNaN(Number(id_producto)) ||
      isNaN(Number(id_almacen)) ||
      !descripcion ||
      !fecha
    ) {
      return res
        .status(400)
        .json({ error: "Datos inválidos o incompletos" });
    }

    try {
      // 3) Pásalos en data con sus nombres exactos
      const logActualizado = await prisma.log.update({
        where: { id_logs: Number(id) },
        data: {
          id_producto: Number(id_producto),
          id_almacen: Number(id_almacen),
          descripcion,
          fecha: new Date(fecha),
        },
      });
      return res.status(200).json(logActualizado);
    } catch (error) {
      console.error("Error al actualizar log:", error);
      return res.status(500).json({ error: "Error al actualizar" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.log.delete({ where: { id_logs: Number(id) } });
      return res.status(204).end();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al momento de eliminar el log" });
    }
  }

  return res.status(405).json({ mensaje: "Método no permitido" });
}
