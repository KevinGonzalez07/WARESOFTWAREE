import { notFound } from "next/navigation";
import prisma from "@/app/api/backend/prisma";
import Sidebar from "@/components/Sidebar";
import UserState from "@/components/UserState";
import WarehouseView from "@/components/WarehouseView";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Mapa de colores
const colorMap = [
  "", // índice 0
  "rgb(93, 120, 219)",  // 1 Blue
  "rgb(235, 71, 71)",   // 2 Red
  "rgb(255, 204, 0)",   // 3 Yellow
  "rgb(153, 102, 51)",  // 4 Brown
  "rgb(0, 204, 255)",   // 5 Aqua
  "rgb(40, 167, 69)",   // 6 Green
  "rgb(255, 145, 68)",  // 7 Orange
  "rgb(111, 66, 193)",  // 8 Purple
  "rgb(255, 99, 132)",  // 9 Pink
  "rgb(108, 117, 125)", // 10 Gray
];

export default async function WarehousePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) notFound();

  const almacen = await prisma.almacen.findUnique({
    where: { id_almacen: id },
    include: { productos: { include: { proveedor: true } } },
  });

  if (!almacen) notFound();

  // Transformar imagen null a string vacía para evitar errores de tipo
  const productosTransformados = almacen.productos.map(producto => ({
    ...producto,
    imagen: producto.imagen ?? "", // si es null, lo convierte a ""
  }));

  const backgroundColor = colorMap[almacen.color] || "white";

  return (
    <main className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="flex justify-between items-center p-4 bg-white">
          <h1 className={`${spaceMono.className} text-black text-3xl font-bold`}>
            &gt;WareSoftWare
          </h1>
          <UserState />
        </header>
        <div className="flex-1 overflow-auto flex justify-center items-start p-10">
          <div style={{ backgroundColor }} className="rounded-3xl shadow-xl p-8">
            <WarehouseView
              nombreAlmacen={almacen.nombre}
              descripcionAlmacen={almacen.descripcion}
              productos={productosTransformados}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
