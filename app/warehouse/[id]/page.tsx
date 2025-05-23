import { notFound } from "next/navigation";
import prisma from "@/backend/prisma";
import Sidebar from "@/components/Sidebar";
import UserState from "@/components/UserState";
import WarehouseView from "@/components/WarehouseView";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const colorMap = [
  "", // índice 0 no usado
  "rgb(93, 120, 219)",  // 1 Azul
  "rgb(235, 71, 71)",   // 2 Rojo
  "rgb(255, 204, 0)",   // 3 Amarillo
  "rgb(153, 102, 51)",  // 4 Marrón
  "rgb(0, 204, 255)",   // 5 Aqua
  "rgb(40, 167, 69)",   // 6 Verde
  "rgb(255, 145, 68)",  // 7 Naranja
  "rgb(111, 66, 193)",  // 8 Púrpura
  "rgb(255, 99, 132)",  // 9 Rosado
  "rgb(108, 117, 125)", // 10 Gris
];

export default async function WarehousePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  const almacen = await prisma.almacen.findUnique({
    where: { id_almacen: id },
    include: {
      productos: {
        include: { proveedor: true },
      },
    },
  });

  if (!almacen) return notFound();

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
          <div
            style={{ backgroundColor }}
            className="rounded-3xl shadow-xl p-8"
          >
            <WarehouseView
              nombreAlmacen={almacen.nombre}
              descripcionAlmacen={almacen.descripcion}
              productos={almacen.productos}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
