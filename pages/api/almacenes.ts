import type { NextApiRequest, NextApiResponse } from 'next'
import { getAlmacenes } from '@/backend/prisma' // Asegúrate de que exista esta función

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { id_usuario } = req.query

  if (!id_usuario || Array.isArray(id_usuario)) {
    return res.status(400).json({ error: 'id_usuario inválido' })
  }

  try {
    const almacenes = await getAlmacenes(parseInt(id_usuario))
    return res.status(200).json(almacenes)
  } catch (error: any) {
    console.error('Error al obtener almacenes:', error)
    return res.status(500).json({ error: 'Error del servidor', detalles: error.message })
  }
}
