import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default prisma;

export async function getAlmacenes(userId: number) {
  return await prisma.almacen.findMany({
    where: {
      id_usuario: userId,
    },
    include: {
      productos: {
        take: 6,
        orderBy: { id_producto: "asc" }, // optional: to define which 6 to show
        select: {
          nombre: true,
          existencia: true,
        },
      },
    },
  });
}